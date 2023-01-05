class ShapedConstantsProvider extends Blockly.blockRendering.ConstantProvider {
    constructor() {
        super()

        this.SET_PATH = this.setPath()
        this.LOGIC_PATH = this.logicPath()
        this.NUMBER_PATH = this.numberPath()
        this.FUNCTION_PATH = this.functionPath()
        this.SQUARE_PATH = this.squarePath()
    }
    shapeFor(connection) {
        const checks = connection.getCheck();
        switch (connection.type) {
            case Blockly.INPUT_VALUE:
            case Blockly.OUTPUT_VALUE:
                switch (checks.join()) {
                    case "Set":
                        return this.SET_PATH
                    case "Boolean":
                        return this.LOGIC_PATH
                    case "Number":
                        return this.NUMBER_PATH
                    case "Set,Number":
                    case "Number,Set":
                        return this.SQUARE_PATH
                }
                return this.LOGIC_PATH;
            case Blockly.PREVIOUS_STATEMENT:
            case Blockly.NEXT_STATEMENT:
                if (checks) {
                    switch (checks[0]) {
                        case "FunctionElement":
                            return this.FUNCTION_PATH
                    }
                }
                return this.NOTCH;
            default:
                throw Error('Unknown type');
        }
    }
    setPath() {
        // Modify
        const offsetFactor = 0.2
        const pointWeight = 1
        const edgeWeight = 0
        // Don't modify
        const offset = offsetFactor * this.TAB_WIDTH
        const bracketWidth = (1 - offsetFactor) * this.TAB_WIDTH
        let path = (shape) => {
            return (
                Blockly.utils.svgPaths.line([
                    Blockly.utils.svgPaths.point(-offset, 0)
                ]) +
                Blockly.utils.svgPaths.curve("c", [
                    Blockly.utils.svgPaths.point(-bracketWidth, edgeWeight * (this.TAB_HEIGHT / 5) * shape),
                    Blockly.utils.svgPaths.point(bracketWidth * (pointWeight - 1), (this.TAB_HEIGHT / 2) * shape),
                    Blockly.utils.svgPaths.point(-bracketWidth, (this.TAB_HEIGHT / 2) * shape)
                ]) +
                Blockly.utils.svgPaths.curve("c", [
                    Blockly.utils.svgPaths.point(bracketWidth * pointWeight, 0),
                    Blockly.utils.svgPaths.point(0, (2 - edgeWeight) * (this.TAB_HEIGHT / 5) * shape),
                    Blockly.utils.svgPaths.point(bracketWidth, (this.TAB_HEIGHT / 2) * shape)
                ]) +
                Blockly.utils.svgPaths.line([
                    Blockly.utils.svgPaths.point(offset, 0)
                ])
            )
        }
        return {
            width: this.TAB_WIDTH,
            height: this.TAB_HEIGHT,
            pathDown: path(1),
            pathUp: path(-1)
        }
    }
    logicPath() {
        let path = (shape) => {
            return (
                Blockly.utils.svgPaths.lineTo(-this.TAB_WIDTH, this.TAB_HEIGHT / 2 * shape) +
                Blockly.utils.svgPaths.lineTo(this.TAB_WIDTH, this.TAB_HEIGHT / 2 * shape)
            )
        }
        return {
            width: this.TAB_WIDTH,
            height: this.TAB_HEIGHT,
            pathDown: path(1),
            pathUp: path(-1)
        }
    }
    numberPath() {
        let path = (shape) => {
            return (
                "a " + (this.TAB_WIDTH) + " " + (this.TAB_HEIGHT / 2) + " 0 0 " + (shape == -1 ? "1" : "0") + " 0 " + (1.9 * this.TAB_WIDTH * shape) // because the function for it is shite
            )
        }
        return {
            width: this.TAB_WIDTH,
            height: this.TAB_HEIGHT,
            pathDown: path(1),
            pathUp: path(-1)
        }
    }
    functionPath() {
        let path = (shape) => {
            return (
                Blockly.utils.svgPaths.line([
                    Blockly.utils.svgPaths.point(0, this.NOTCH_HEIGHT),
                    Blockly.utils.svgPaths.point(this.NOTCH_WIDTH * shape, 0),
                    Blockly.utils.svgPaths.point(0, -this.NOTCH_HEIGHT)
                ])
            )
        }
        return {
            type: this.SHAPES.NOTCH,
            width: this.NOTCH_WIDTH,
            height: this.NOTCH_HEIGHT,
            pathLeft: path(1),
            pathRight: path(-1)
        }
    }
    squarePath() {
        let path = (shape) => {
            return Blockly.utils.svgPaths.line([
                Blockly.utils.svgPaths.point(-this.TAB_WIDTH, 0),
                Blockly.utils.svgPaths.point(0, this.TAB_HEIGHT * shape),
                Blockly.utils.svgPaths.point(this.TAB_WIDTH, 0)
            ])
        }
        return {
            width: this.TAB_WIDTH,
            height: this.TAB_HEIGHT,
            pathDown: path(1),
            pathUp: path(-1)
        }
    }
}

class ShapedRenderer extends Blockly.thrasos.Renderer {
    constructor(name) {
        super(name);
    }

    makeConstants_() {
        return new ShapedConstantsProvider();
    }
};

Blockly.blockRendering.register('shaped_renderer', ShapedRenderer);
console.log("Renderer registered")