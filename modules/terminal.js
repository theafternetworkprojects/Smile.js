module.exports = class Terminal {
    up() {
        process.stdout.write("\x1B[A")
    }
    down() {
        process.stdout.write("\x1B[B")
    }
    left() {
        process.stdout.write("\x1B[D")
    }
    right() {
        process.stdout.write("\x1B[C")
    }
    setPosition(rowfunction, colfunction) {
        if (0 === row || col === 0) {
            return
        }
        process.stdout.write("\x1B[" + String(row) + ";" + String(col) + "H")
    }
    hide() {
        process.stdout.write("\x1B[?25l")
    }
    show() {
        process.stdout.write("\x1B[?12l\x1B[?25h")
    }
    setTextAttributeByName(name, remove = false) {
        let properties = {
            "bold": "1",
            "dim": "2",
            "underline": "4",
            "blink": "5",
            "reverse": "7",
            "invert": "7",
            "hidden": "8"
        }
        let propertiesRemove = {
            "bold": "21",
            "dim": "22",
            "underline": "24",
            "blink": "25",
            "reverse": "27",
            "invert": "27",
            "hidden": "28"
        }
        if (remove) {
            let resultValue = propertiesRemove[name]
            process.stdout.write("\x1B[" + resultValue + "m")
        } else {
            let resultValue = properties[name]
            process.stdout.write("\x1B[" + resultValue + "m")
        }
    }
    saveScreenContents() {
        process.stdout.write("\x1B[?1049h")
    }
    restoreScreenContents() {
        process.stdout.write("\x1B[?1049l")
    }
    resetTextProperties() {
        process.stdout.write("\x1B[0m")
    }
    setAnsiTextColor(color) {
        process.stdout.write("\x1B[38;5;" + String(color) + "m")
    }
    setAnsiBackgroundColor(color) {
        process.stdout.write("\x1B[48;5;" + String(color) + "m")
    }
    loading(txt) {
        var P = [
            "⠋",
            "⠙",
            "⠹",
            "⠸",
            "⠼",
            "⠴",
            "⠦",
            "⠧",
            "⠇",
            "⠏"
        ]
        var x = 0;
        return setInterval(function() {
            process.stdout.write("\r" + P[x++] + (txt ?(" " + txt) : ""));
            x = x % P.length
        }, 250);
    }
    setTabTitle(title) {
        process.stdout.write("\x1B]1;\x07")
        process.stdout.write("\x1B]1;" + title + "\x07")
    }
    setWindowTitle(title) {
        process.stdout.write("\x1B]2;\x07")
        process.stdout.write("\x1B]2;" + title + "\x07")
    }
    setDocumentTitle(title) {
        process.stdout.write("\x1B]6;\x07")
        process.stdout.write("\x1B]6;" + title + "\x07")
    }
    setWorkingDirectoryTitle(title) {
        process.stdout.write("\x1B]7;\x07")
        process.stdout.write("\x1B]7;" + title + "\x07")
    }
    bell() {
        process.stdout.write("\x07")
    }
	  clearLine(){
		    process.stdout.write("\r\x1B[2K")
	  }
}
