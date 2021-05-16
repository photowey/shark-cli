/**
 * Replace the variable.
 * @see {@} @lib/context/VariableContext 
 * @param {@} target 
 * @param {*} contexts 
 * @returns 
 */
function replaceVariables(target, contexts) {
    let result = target;
    Object.keys(contexts).forEach((key, index) => {
        let value = contexts[key]
        result = result.replace(new RegExp(`\\$\\{\\s*${key}\\s*\\}`, "g"), value);
    })

    return result;
}

module.exports = {
    replaceVariables
}