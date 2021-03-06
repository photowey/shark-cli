/**
 * The $shark DB.
 */
class SharkDB {
    constructor(projects) {
        this.projects = projects
    }
}

/**
 * The Project.
 */
class Project {
    constructor(code, name, path) {
        this.code = code
        this.name = name
        this.path = path
    }
}

module.exports = {
    SharkDB,
    Project
}
