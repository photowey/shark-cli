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
    constructor(code, name, dir) {
        this.code = code
        this.name = name
        this.dir = dir
    }
}

module.exports = {
    SharkDB,
    Project
}
