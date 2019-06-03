/** Core node options */
export interface CoreNodeOptions {}

/** Core node */
abstract class CoreNode {
    /** Create core node */
    constructor(public options: CoreNodeOptions, coreNode?: CoreNode) {}
}
