BLOCKS_TO_TYPES = {
    "setbuilder_set": "Set",
    "setbuilder_number": "Number",
    "setbuilder_ellipsis": "Ellipsis"
}
TYPES_TO_BLOCKS = Object.fromEntries(Object.entries(BLOCKS_TO_TYPES).map(a => a.reverse()))

Blockly.Extensions.registerMutator(
    "setbuilder_mutator",
    {
        saveExtraState: function() {
            return {
                "elements": this.elements_
            }
        },
        loadExtraState: function(state) {
            this.elements_ = state['elements']
            this.updateShape_()
        },
        decompose: function(workspace) {
            var topBlock = workspace.newBlock("setbuilder_container")
            topBlock.initSvg()
            var connection = topBlock.getInput('STACK').connection
            for (let i of this.elements_) {
                var itemBlock = workspace.newBlock(TYPES_TO_BLOCKS[i])
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

            for (var i = 0; i < this.elements_.length; i++) {
                if (!this.getInput('THING' + i).connection) {
                    continue
                }
                var connection = this.getInput('THING' + i).connection.targetConnection
                if (connection && connections.indexOf(connection) == -1) {
                    connection.disconnect()
                }
            }

            this.elements_ = []
            var itemBlock = topBlock.getInputTargetBlock('STACK')
            while (itemBlock && !itemBlock.isInsertionMarker()) {  // Ignore insertion markers!
                this.elements_.push(BLOCKS_TO_TYPES[itemBlock.type])
                itemBlock = itemBlock.nextConnection &&
                    itemBlock.nextConnection.targetBlock()
            }
            this.updateShape_()

            for (var i = 0; i < this.elements_.length; i++) {
                if (connections[i]) {
                    Blockly.Mutator.reconnect(connections[i], this, 'THING' + i)
                }
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
                if (input.connection) {
                    itemBlock.valueConnection_ = input && input.connection.targetConnection;
                }
                itemBlock = itemBlock.getNextBlock();
                i++;
            }
        },
        updateShape_: function() {
            if (this.getInput('END')) {
                this.removeInput('END');
            }
            if (this.elements_.length && this.getInput('EMPTY')) {
                this.removeInput('EMPTY');
            } else if (!this.elements_.length && !this.getInput('EMPTY')) {
                this.appendDummyInput('EMPTY').appendField("{}");
            }
            // Remove inputs.
            let toRemove = []
            for (let i of this.inputList) {
                if (i.name.startsWith("THING")) {
                    toRemove.push(i.name)
                }
            }
            for (let i of toRemove) {
                this.removeInput(i)
            }
            // Add new inputs.
            for (let i = 0; i < this.elements_.length; i++) {
                let input
                if (this.elements_[i] == "Ellipsis") {
                    input = this.appendDummyInput('THING' + i).setAlign(Blockly.Input.Align.RIGHT)
                }
                else {
                    input = this.appendValueInput('THING' + i).setAlign(Blockly.Input.Align.RIGHT).setCheck([this.elements_[i]])
                }
                if (i === 0) {
                    input.appendField("{")
                }
                else {
                    input.appendField(",")
                }
                if (this.elements_[i] == "Ellipsis") {
                    input.appendField("...")
                }
            }
            if (this.elements_.length) {
                this.appendDummyInput('END').appendField("}")
            }

        }
    },
    function() {
        this.elements_ = ["Set"]
        this.updateShape_()
    },
    ["setbuilder_number", "setbuilder_set", "setbuilder_ellipsis"]
)