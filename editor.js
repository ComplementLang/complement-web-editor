Blockly.Msg.LOGIC_HUE = 105
Blockly.Msg.SET_HUE = 45

Blockly.defineBlocksWithJsonArray([
    // Misc
    /*
    {
        "type": "base_old",
        "message0": "",
        "args0": [],
        "colour": "%{BKY_LOGIC_HUE}",
        "mutator": "base_mutator"
    },
    {
        "type": "base_container",
        "message0": "⊤%1%2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "STACK"
            }
        ],
        "colour": "%{BKY_LOGIC_HUE}"
    },
    {
        "type": "base_item",
        "message0": "statement",
        "args0": [],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "%{BKY_LOGIC_HUE}"
    },
    */
    {
        "type": "base",
        "message0": "on run%1%2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "items",
                "check": "FunctionElement",
            }
        ],
        "colour": "%{BKY_PROCEDURES_HUE}"
    },
    // Logic
    {
        "type": "quantifier",
        "message0": "%1 %2 %3 %4",
        "args0": [
            {
                "type": "field_dropdown_verbose",
                "name": "constraint",
                "options": [
                    [
                        "∀",
                        "forall",
                        "For all"
                    ],
                    [
                        "∃",
                        "thereexists",
                        "There exists"
                    ],
                    [
                        "∃!",
                        "thereexistsone",
                        "There exists one"
                    ]
                ]
            },
            {
                "type": "field_variable",
                "name": "var",
                "variable": "x",
                "variableTypes": ["Number", "Set"],
                "defaultType": "Number"
            },
            {
                "type": "input_value",
                "name": "condition",
                "check": "Boolean"
            },
            {
                "type": "input_value",
                "name": "action",
                "check": "Boolean"
            }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "colour": "%{BKY_LOGIC_HUE}",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "connective",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "input_value",
                "name": "condition1",
                "check": "Boolean"
            },
            {
                "type": "field_dropdown_verbose",
                "name": "connective",
                "options": [
                    [
                        "∧",
                        "and",
                        "AND"
                    ],
                    [
                        "∨",
                        "or",
                        "OR"
                    ],
                    [
                        "⊻",
                        "xor",
                        "XOR"
                    ],
                    [
                        "⇒",
                        "implies",
                        "Implies"
                    ],
                    [
                        "⇔",
                        "iff",
                        "Iff"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "condition2",
                "check": "Boolean"
            }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "colour": "%{BKY_LOGIC_HUE}"
    },
    {
        "type": "always-true-false",
        "message0": "%1",
        "args0": [
            {
                "type": "field_dropdown_verbose",
                "name": "predicate",
                "options": [
                    [
                        "⊤",
                        "always-true",
                        "Always True"
                    ],
                    [
                        "⊥",
                        "always-false",
                        "Always False"
                    ]
                ]
            }
        ],
        "output": "Boolean",
        "colour": "%{BKY_LOGIC_HUE}"
    },
    {
        "type": "not",
        "message0": "¬ %1",
        "args0": [
            {
                "type": "input_value",
                "name": "condition",
                "check": "Boolean"
            }
        ],
        "output": "Boolean",
        "colour": "%{BKY_LOGIC_HUE}"
    },
    // Number
    {
        "type": "number",
        "message0": "%1",
        "args0": [
            {
                "type": "field_number",
                "name": "value",
                "value": 0,
                "precision": 1
            }
        ],
        "colour": "%{BKY_MATH_HUE}",
        "output": "Number"
    },
    {
        "type": "number_comparison",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "input_value",
                "name": "condition1",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "CONNECTIVE",
                "options": [
                    [
                        "=",
                        "equals"
                    ],
                    [
                        "≠",
                        "inequals"
                    ],
                    [
                        ">",
                        "greaterthan"
                    ],
                    [
                        "<",
                        "lessthan"
                    ],
                    [
                        "≥",
                        "greaterequal"
                    ],
                    [
                        "≤",
                        "lessequal"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "condition2",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "colour": "%{BKY_LOGIC_HUE}"
    },
    {
        "type": "math",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "input_value",
                "name": "condition1",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "op",
                "options": [
                    [
                        "+",
                        "plus"
                    ],
                    [
                        "-",
                        "minus"
                    ],
                    [
                        "×",
                        "times"
                    ],
                    [
                        "/",
                        "over"
                    ],
                    [
                        "%",
                        "modulo"
                    ],
                    [
                        "^",
                        "exponent"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "condition2",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "output": "Number",
        "colour": "%{BKY_MATH_HUE}"
    },
    {
        "type": "number_constraint",
        "message0": "%1 < %2 < %3",
        "args0": [
            {
                "type": "input_value",
                "name": "min",
                "check": "Number"
            },
            {
                "type": "field_variable",
                "name": "var",
                "variable": "x",
                "variableTypes": ["Number"],
                "defaultType": "Number"
            },
            {
                "type": "input_value",
                "name": "max",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "colour": "%{BKY_LOGIC_HUE}"
    },
    {
        "type": "number_variable",
        "message0": "%1",
        "args0": [
            {
                "type": "field_variable",
                "name": "var",
                "variable": "x",
                "variableTypes": ["Number"],
                "defaultType": "Number"
            }
        ],
        "output": "Number",
        "colour": "%{BKY_MATH_HUE}"
    },
    {
        "type": "pi",
        "message0": "π",
        "output": "Number",
        "colour": "%{BKY_MATH_HUE}"
    },
    {
        "type": "e",
        "message0": "e",
        "output": "Number",
        "colour": "%{BKY_MATH_HUE}"
    },
    {
        "type": "negate",
        "message0": "-%1",
        "args0": [
            {
                "type": "input_value",
                "name": "number",
                "check": "Number"
            }
        ],
        "output": "Number",
        "colour": "%{BKY_MATH_HUE}"
    },
    {
        "type": "floor",
        "message0": "⌊%1⌋",
        "args0": [
            {
                "type": "input_value",
                "name": "number",
                "check": "Number"
            }
        ],
        "output": "Number",
        "colour": "%{BKY_MATH_HUE}"
    },
    {
        "type": "ceil",
        "message0": "⌈%1⌉",
        "args0": [
            {
                "type": "input_value",
                "name": "number",
                "check": "Number"
            }
        ],
        "output": "Number",
        "colour": "%{BKY_MATH_HUE}"
    },
    {
        "type": "nearest-int",
        "message0": "⌊%1⌉",
        "args0": [
            {
                "type": "input_value",
                "name": "number",
                "check": "Number"
            }
        ],
        "output": "Number",
        "colour": "%{BKY_MATH_HUE}"
    },
    // Sets
    {
        "type": "setbuilder",
        "message0": "",
        "args0": [],
        "inputsInline": true,
        "output": "Set",
        "colour": "%{BKY_SET_HUE}",
        "mutator": "setbuilder_mutator"
    },
    {
        "type": "setbuilder_container",
        "message0": "{%1%2}",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "STACK"
            }
        ],
        "colour": "%{BKY_SET_HUE}"
    },
    {
        "type": "setbuilder_number",
        "message0": "number",
        "previousStatement": null,
        "nextStatement": null,
        "colour": "%{BKY_SET_HUE}"
    },
    {
        "type": "setbuilder_set",
        "message0": "set",
        "previousStatement": null,
        "nextStatement": null,
        "colour": "%{BKY_SET_HUE}"
    },
    {
        "type": "setbuilder_ellipsis",
        "message0": "...",
        "previousStatement": null,
        "nextStatement": null,
        "colour": "%{BKY_SET_HUE}"
    },
    {
        "type": "set_contains",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "input_value",
                "name": "thing1",
                "check": ["Set", "Number"]
            },
            {
                "type": "field_dropdown_verbose",
                "name": "op",
                "options": [
                    [
                        "∈",
                        "in",
                        "is a member of"
                    ],
                    [
                        "∉",
                        "not-in",
                        "isn't a member of"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "thing2",
                "check": "Set"
            }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "colour": "%{BKY_SET_HUE}"
    },
    {
        "type": "set_special",
        "message0": "%1",
        "args0": [
            {
                "type": "field_dropdown_verbose",
                "name": "set",
                "options": [
                    [
                        "ℕ",
                        "naturals",
                        "Natural numbers"
                    ],
                    [
                        "ℤ",
                        "integers",
                        "Integers"
                    ],
                    [
                        "𝕠",
                        "stdout",
                        "STDOUT"
                    ],
                    [
                        "𝕚",
                        "stdin",
                        "STDIN"
                    ]
                ]
            }
        ],
        "output": "Set",
        "colour": "%{BKY_SET_HUE}"
    },
    {
        "type": "set_empty",
        "message0": "∅",
        "output": "Set",
        "colour": "%{BKY_SET_HUE}"
    },
    {
        "type": "set_variable",
        "message0": "%1",
        "args0": [
            {
                "type": "field_variable",
                "name": "var",
                "variable": "x",
                "variableTypes": ["Set"],
                "defaultType": "Set"
            }
        ],
        "output": "Set",
        "colour": "%{BKY_SET_HUE}"
    },
    {
        "type": "set_comparison",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "input_value",
                "name": "condition1",
                "check": "Set"
            },
            {
                "type": "field_dropdown_verbose",
                "name": "op",
                "options": [
                    [
                        "=",
                        "equals"
                    ],
                    [
                        "≠",
                        "inequals"
                    ],
                    [
                        "⊆",
                        "subset",
                        "Subset"
                    ],
                    [
                        "⊊",
                        "proper-subset",
                        "Proper subset"
                    ],
                    [
                        "⊇",
                        "converse-subset",
                        "Converse subset"
                    ],
                    [
                        "⊋",
                        "converse-proper-subset",
                        "Converse proper subset"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "condition2",
                "check": "Set"
            }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "colour": "%{BKY_LOGIC_HUE}"
    },
    {
        "type": "set_operation",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "input_value",
                "name": "condition1",
                "check": "Set"
            },
            {
                "type": "field_dropdown_verbose",
                "name": "op",
                "options": [
                    [
                        "∪",
                        "union",
                        "Union"
                    ],
                    [
                        "∩",
                        "intersection",
                        "Intersection"
                    ],
                    [
                        "∖",
                        "difference",
                        "Difference"
                    ],
                    [
                        "⊖",
                        "symmetric-difference",
                        "Symmetric difference"
                    ],
                    [
                        "×",
                        "product",
                        "Product"
                    ],
                    [
                        "⊔",
                        "disjoint-union",
                        "Disjoint union"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "condition2",
                "check": "Set"
            }
        ],
        "inputsInline": true,
        "output": "Set",
        "colour": "%{BKY_SET_HUE}"
    },
    // Functions
    {
        "type": "function_definition",
        "message0": "%1%2 -> %3%4",
        "args0": [
            {
                "type": "field_input",
                "name": "name",
                "text": "f"
            },
            {
                "type": "field_label_serializable",
                "name": "args",
                "text": ""
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "items",
                "check": "FunctionElement"
            }
        ],
        "colour": "%{BKY_PROCEDURES_HUE}",
        "mutator": "function_mutator"
    },
    {
        "type": "function_definition_return",
        "message0": "%1%2 :: %3 -> %4%5",
        "args0": [
            {
                "type": "field_input",
                "name": "function-name",
                "text": "f"
            },
            {
                "type": "field_label_serializable",
                "name": "args",
                "text": ""
            },
            {
                "type": "field_variable",
                "name": "var",
                "variable": "o"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "items",
                "check": "FunctionElement"
            }
        ],
        "colour": "%{BKY_PROCEDURES_HUE}",
        "mutator": "function_mutator"
    },
    {
        "type": "function_definition_args_container",
        "message0": "args %1%2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "stack"
            }
        ],
        "colour": "%{BKY_PROCEDURES_HUE}"
    },
    {
        "type": "function_definition_arg",
        "message0": "argument %1",
        "args0": [
            {
                "type": "field_input",
                "name": "arg",
                "text": "x"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "%{BKY_PROCEDURES_HUE}"
    },
    {
        "type": "function_element",
        "message0": "make %1 %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "op",
                "options": [
                    [
                        "true",
                        "true"
                    ],
                    [
                        "false",
                        "false"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "thing",
                "check": "Boolean"
            }
        ],
        "colour": "%{BKY_PROCEDURES_HUE}",
        "previousStatement": ["FunctionElement"],
        "nextStatement": ["FunctionElement"],
    },
    {
        "type": "function_call",
        "message0": "%1%2",
        "args0": [
            {
                "type": "field_label_serializable",
                "name": "name"
            },
            {
                "type": "field_label_serializable",
                "name": "args"
            }
        ],
        "colour": "%{BKY_PROCEDURES_HUE}",
        "extensions": ["function_call"]
    }
])

const toolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Logic",
            "contents": [
                {
                    "kind": "block",
                    "type": "quantifier"
                },
                {
                    "kind": "block",
                    "type": "connective"
                },
                {
                    "kind": "block",
                    "type": "connective",
                    "fields": {
                        "connective": "implies"
                    }
                },
                {
                    "kind": "block",
                    "type": "not"
                },
                {
                    "kind": "block",
                    "type": "always-true-false"
                },
                {
                    "kind": "block",
                    "type": "always-true-false",
                    "fields": {
                        "predicate": "always-false"
                    }
                }
            ]
        },
        {
            "kind": "category",
            "name": "Numbers",
            "contents": [
                {
                    "kind": "block",
                    "type": "number_comparison"
                },
                {
                    "kind": "block",
                    "type": "number_constraint"
                },
                {
                    "kind": "block",
                    "type": "number"
                },
                {
                    "kind": "block",
                    "type": "math"
                },
                {
                    "kind": "block",
                    "type": "number_variable"
                },
                {
                    "kind": "block",
                    "type": "pi"
                },
                {
                    "kind": "block",
                    "type": "e"
                },
                {
                    "kind": "block",
                    "type": "negate"
                },
                {
                    "kind": "block",
                    "type": "floor"
                },
                {
                    "kind": "block",
                    "type": "ceil"
                },
                {
                    "kind": "block",
                    "type": "nearest-int"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Sets",
            "contents": [
                {
                    "kind": "block",
                    "type": "setbuilder"
                },
                {
                    "kind": "block",
                    "type": "set_contains"
                },
                {
                    "kind": "block",
                    "type": "set_operation"
                },
                {
                    "kind": "block",
                    "type": "set_comparison"
                },
                {
                    "kind": "block",
                    "type": "set_special"
                },
                {
                    "kind": "block",
                    "type": "set_empty"
                },
                {
                    "kind": "block",
                    "type": "set_variable"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Functions",
            "contents": [
                /*
                {
                    "kind": "block",
                    "type": "function_definition_return"
                },
                {
                    "kind": "block",
                    "type": "function_definition"
                },
                */
                {
                    "kind": "block",
                    "type": "function_element"
                },
                {
                    "kind": "block",
                    "type": "function_element",
                    "fields": {
                        "op": "false"
                    }
                }
            ]
        }
    ]
}
function setup() {
    console.log("Starting editor!")
    const workspace = Blockly.inject('blocklyDiv', {
        toolbox: toolbox,
        renderer: "shaped_renderer",
        theme: Blockly.Theme.defineTheme("mono", {
            "base": (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? "dark" : "classic",
            "fontStyle": {
                "family": "monospace"
            }
        })
    })
    workspace.scrollX = 30
    workspace.scrollY = 30
    window.workspace = workspace
    const base = workspace.newBlock("base")
    base.setMovable(false)
    base.setDeletable(false)
    //base.getFirstStatementConnection().setShadowState(Blockly.serialization.blocks.save(workspace.newBlock("function_element")))
    let b = workspace.newBlock("function_element")
    b.initSvg()
    b.render()
    base.initSvg()
    base.render()
    base.getFirstStatementConnection().connect(b.previousConnection)
    console.log("Startup complete.")
}

window.addEventListener("load", setup)