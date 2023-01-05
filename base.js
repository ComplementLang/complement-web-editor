console.warn("base.js loaded! This file is old and shouldn't be used.")

Blockly.Extensions.registerMutator(
    "base_mutator",
    {
        saveExtraState: function() {
            return {
                "itemCount": this.itemCount_
            }
        },
        loadExtraState: function(state) {
            this.itemCount_ = state['itemCount']
            this.updateShape_()
        },
        decompose: function(workspace) {
            var topBlock = workspace.newBlock("base_container")
            topBlock.initSvg()
            var connection = topBlock.getInput('STACK').connection
            for (var i = 0; i < this.itemCount_; i++) {
                var itemBlock = workspace.newBlock("base_item")
                itemBlock.initSvg()
                connection.connect(itemBlock.previousConnection)
                connection = itemBlock.nextConnection
            }
            return topBlock
        },
        compose: function(topBlock) {
            var itemBlock = topBlock.getInputTargetBlock('STACK')
            var connections = []
            while (itemBlock && !itemBlock.isInsertionMarker()) {  // Ignore insertion markers!
                connections.push(itemBlock.valueConnection_)
                itemBlock = itemBlock.nextConnection &&
                    itemBlock.nextConnection.targetBlock()
            }

            for (var i = 0; i < this.itemCount_; i++) {
                var connection = this.getInput('THING' + i).connection.targetConnection
                if (connection && connections.indexOf(connection) == -1) {
                    connection.disconnect()
                }
            }

            this.itemCount_ = connections.length
            this.updateShape_()

            for (var i = 0; i < this.itemCount_; i++) {
                Blockly.Mutator.reconnect(connections[i], this, 'THING' + i)
            }
        },
        saveConnections: function(containerBlock) {
            let itemBlock = containerBlock.getInputTargetBlock('STACK');
            let i = 0;
            while (itemBlock) {
                if (itemBlock.isInsertionMarker()) {
                    itemBlock = itemBlock.getNextBlock();
                    continue;
                }
                const input = this.getInput('THING' + i);
                itemBlock.valueConnection_ = input && input.connection.targetConnection;
                itemBlock = itemBlock.getNextBlock();
                i++;
            }
        },
        updateShape_: function() {
            if (this.itemCount_ && this.getInput('EMPTY')) {
                this.removeInput('EMPTY');
            } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
                this.appendDummyInput('EMPTY').appendField("make true");
            }
            // Add new inputs.
            for (let i = 0; i < this.itemCount_; i++) {
                if (!this.getInput('THING' + i)) {
                    const input = this.appendValueInput('THING' + i).setAlign(Blockly.Input.Align.RIGHT).setCheck(["Boolean"])
                    if (i === 0) {
                        input.appendField("make true");
                    }
                }
            }
            // Remove deleted inputs.
            for (let i = this.itemCount_; this.getInput('THING' + i); i++) {
                this.removeInput('THING' + i)
            }
        }
    },
    function() {
        this.itemCount_ = 1
        this.updateShape_()
    },
    ["base_item"]
)