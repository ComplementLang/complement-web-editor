class VerboseDropdown extends Blockly.FieldDropdown {
    constructor(menuGenerator, opt_validator, opt_config) {
        super(Blockly.Field.SKIP_SETUP)
        // If we pass SKIP_SETUP, don't do *anything* with the menu generator.
        if (menuGenerator === Blockly.Field.SKIP_SETUP) {
            return;
        }

        if (Array.isArray(menuGenerator)) {
            validateOptions(menuGenerator);
            // Deep copy the option structure so it doesn't change.
            menuGenerator = JSON.parse(JSON.stringify(menuGenerator));
        }

        /**
         * An array of options for a dropdown list,
         * or a function which generates these options.
         */
        this.menuGenerator_ = menuGenerator

        this.trimOptions_();

        /**
         * The currently selected option. The field is initialized with the
         * first option selected.
         */
        this.selectedOption_ = this.getOptions(false)[0];

        if (opt_config) {
            this.configure_(opt_config);
        }
        this.setValue(this.selectedOption_[1]);
        if (opt_validator) {
            this.setValidator(opt_validator);
        }
    }
    // Have to redefine this so it uses our custom applyTrim_
    trimOptions_() {
        console.log("BogosBinted")
        const options = this.menuGenerator_;
        if (!Array.isArray(options)) {
            return;
        }
        let hasImages = false;

        // Localize label text and image alt text.
        for (let i = 0; i < options.length; i++) {
            const label = options[i][0];
            if (typeof label === 'string') {
                options[i][0] = Blockly.utils.parsing.replaceMessageReferences(label);
            } else {
                if (label.alt !== null) {
                    options[i][0].alt = Blockly.utils.parsing.replaceMessageReferences(label.alt);
                }
                hasImages = true;
            }
        }
        if (hasImages || options.length < 2) {
            return;  // Do nothing if too few items or at least one label is an image.
        }
        const strings = [];
        for (let i = 0; i < options.length; i++) {
            strings.push(options[i][0]);
        }
        const shortest = Blockly.utils.string.shortestStringLength(strings);
        const prefixLength = Blockly.utils.string.commonWordPrefix(strings, shortest);
        const suffixLength = Blockly.utils.string.commonWordSuffix(strings, shortest);
        if (!prefixLength && !suffixLength) {
            return;
        }
        if (shortest <= prefixLength + suffixLength) {
            // One or more strings will entirely vanish if we proceed.  Abort.
            return;
        }
        if (prefixLength) {
            this.prefixField = strings[0].substring(0, prefixLength - 1);
        }
        if (suffixLength) {
            this.suffixField = strings[0].substr(1 - suffixLength);
        }

        this.menuGenerator_ =
            VerboseDropdown.applyTrim_(options, prefixLength, suffixLength);
    }
    static applyTrim_(options, prefixLength, suffixLength) {
        console.log(options)
        const newOptions = [];
        // Remove the prefix and suffix from the options.
        for (let i = 0; i < options.length; i++) {
            let text = options[i][0];
            const value = options[i][1];
            const desc = options[i][2]
            text = text.substring(prefixLength, text.length - suffixLength);
            newOptions[i] = [text, value, desc];
        }
        return newOptions;
    }
    dropdownCreate_() {
        const menu = new Blockly.Menu();
        menu.setRole(Blockly.utils.aria.Role.LISTBOX);
        this.menu_ = menu;

        const options = this.getOptions(false);
        this.selectedMenuItem_ = null;
        for (let i = 0; i < options.length; i++) {
            console.log(options[i])
            let content = options[i][0];  // Human-readable text or image.
            const value = options[i][1];  // Language-neutral value.
            let desc = options[i][2]
            const menuItem = new Blockly.MenuItem(options[i].length == 3 ? content + " (" + desc + ")" : content, value);
            menuItem.setRole(Blockly.utils.aria.Role.OPTION);
            menuItem.setRightToLeft(this.getSourceBlock().RTL);
            menuItem.setCheckable(true);
            menu.addChild(menuItem);
            menuItem.setChecked(value === this.value_);
            if (value === this.value_) {
                this.selectedMenuItem_ = menuItem;
            }
            menuItem.onAction(this.handleMenuActionEvent_, this);
        }
    }
}

function validateOptions(options) {
  if (!Array.isArray(options)) {
    throw TypeError('FieldDropdown options must be an array.');
  }
  if (!options.length) {
    throw TypeError('FieldDropdown options must not be an empty array.');
  }
  let foundError = false;
  for (let i = 0; i < options.length; i++) {
    const tuple = options[i];
    if (!Array.isArray(tuple)) {
      foundError = true;
      console.error(
          'Invalid option[' + i + ']: Each FieldDropdown option must be an ' +
              'array. Found: ',
          tuple);
    } else if (typeof tuple[1] !== 'string') {
      foundError = true;
      console.error(
          'Invalid option[' + i + ']: Each FieldDropdown option id must be ' +
              'a string. Found ' + tuple[1] + ' in: ',
          tuple);
    } else if (
        tuple[0] && typeof tuple[0] !== 'string' &&
        typeof tuple[0].src !== 'string') {
      foundError = true;
      console.error(
          'Invalid option[' + i + ']: Each FieldDropdown option must have a ' +
              'string label or image description. Found' + tuple[0] + ' in: ',
          tuple);
    }
  }
  if (foundError) {
    throw TypeError('Found invalid FieldDropdown options.');
  }
}

Blockly.fieldRegistry.register("field_dropdown_verbose", VerboseDropdown);