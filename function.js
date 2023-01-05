// ABANDON ALL HOPE, YE WHO ENTER HERE
Blockly.Extensions.registerMutator(
    "function_mutator",
    {
        saveExtraState: function() {
            let result = []
            for (let model of this.paramModels_) {
                result.push({
                    "name": model.getName(),
                    "id": model.getId()
                })
            }
            return result
        },
        loadExtraState: function(state) {
            let i = 0
            for (let modelData of state) {
                const varName = modelData.name
                const varId = modelData.id
                this.arguments_.push(varName)
                const model = new Blockly.Procedures.ObservableParameterModel(this.workspace, varName, varId)
                model.index_ = i
                this.paramModels_.push(model)
                this.procedureModel_.insertParameter(model, i++)
            }
            this.updateParams_()
            this.mutateCallers_()
        },
        decompose: function(workspace) {
            const topBlock = workspace.newBlock("function_definition_args_container")
            topBlock.initSvg()
            let connection = topBlock.getInput("stack").connection
            let i = 0
            workspace.addChangeListener(this.onChange.bind(this))
            for (let arg of this.arguments_) {
                const block = workspace.newBlock("function_definition_arg")
                block.initSvg()
                block.setFieldValue(arg, "arg")
                block.paramModel_ = this.paramModels_[i++]
                connection.connect(block.previousConnection)
                connection = block.nextConnection
            }
            return topBlock
        },
        compose: function(topBlock) {
            this.arguments_ = []
            this.paramIds_ = []
            this.paramModels_ = []
            let block = topBlock.getInputTargetBlock("stack")
            let i = 0
            while (block && !block.isInsertionMarker()) {
                const varName = block.getFieldValue("arg")
                this.arguments_.push(varName)
                if (!block.paramModel_) {
                    console.log("new")
                    block.paramModel_ = new Blockly.Procedures.ObservableParameterModel(this.workspace, varName, null)
                    this.procedureModel_.insertParameter(block.paramModel_, i)
                }
                else {
                    console.log("rename")
                    block.paramModel_.setName(varName)
                }
                block.paramModel_.index_ = i
                this.paramModels_.push(block.paramModel_)
                this.paramIds_.push(block.id);
                block = block.nextConnection && block.nextConnection.targetBlock()
                i++
            }
            this.updateParams_()
            this.mutateCallers_()

        },
        updateParams_: function() {
            this.setFieldValue("(" + this.arguments_.join(" ") + ")", "args")
        },
        // Gotta reimplement this!
        mutateCallers_: function() {
            const oldRecordUndo = Blockly.Events.getRecordUndo()
            const name = this.getProcedureDef()[0]
            const data = this.saveExtraState();
            const callers = Blockly.Procedures.getCallers(name, this.workspace);
            for (let i = 0, caller; caller = callers[i]; i++) {
                const oldData = caller.saveExtraState();
                if (caller.loadExtraState) {
                    caller.loadExtraState(data);
                }
                const newData = caller.saveExtraState();
                if (oldData !== newData) {
                    // Fire a mutation on every caller block.  But don't record this as an
                    // undo action since it is deterministically tied to the procedure's
                    // definition mutation.
                    Blockly.Events.setRecordUndo(false);
                    Blockly.Events.fire(new (Blockly.Events.get(Blockly.Events.BLOCK_CHANGE))(
                        caller, 'mutation', null, oldData, newData));
                    Blockly.Events.setRecordUndo(oldRecordUndo);
                }
            }
        },
        getProcedureDef: function() {
            return [this.getFieldValue('name'), this.arguments_, false];
        },
        onChange: function(event) {
            let b = Blockly.Workspace.getById(event.workspaceId).getBlockById(event.blockId)
            if (b) {
                if (event.type == Blockly.Events.BLOCK_MOVE && b.type == "function_definition_arg" && event.oldParentId != undefined && event.newParentId == undefined) {
                    this.procedureModel_.deleteParameter(b.paramModel_.index_)
                }
            }

        }
    },
    function() {
        this.arguments_ = []
        this.paramIds_ = [];
        this.paramModels_ = [];
        this.procedureModel_ = new Blockly.Procedures.ObservableProcedureModel(this.workspace, this.getFieldValue('name'), this.id)
        this.workspace.getProcedureMap().add(this.procedureModel_)
        this.updateParams_()
        //this.workspace.addChangeListener((e) => console.log(e.type))
    },
    ["function_definition_arg"]
)

Blockly.Extensions.registerMixin("function_call", {
    onchange: function(e) {
        //console.log(e)
    }
})

console.log("Function mutator registered")