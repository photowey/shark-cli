// shark-cli cmds utils
const child_process = require("child_process");

/**
 * 判断是否安装了 yarn
 * @returns {@code boolean}
 */
 function hasYarn() {
  try {
      child_process.execSync("yarn --version", {
          stdio: "ignore"
      });
      return true;
  } catch (e) {
      return false;
  }
}

/**
* 判断是否安装了 Java
* @returns {@code boolean}
*/
function hasJava() {
  try {
      child_process.execSync("java -version", {
          stdio: "ignore"
      });
      return true;
  } catch (e) {
      return false;
  }
}

/**
 * 判断是否安装了 Maven
 * @returns {@code boolean}
 */
function hasMvn() {
  try {
      child_process.execSync("mvn -v", {
          stdio: "ignore"
      });
      return true;
  } catch (e) {
      return false;
  }
}

module.exports = {
  hasYarn,
  hasJava,
  hasMvn,
};