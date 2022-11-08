


export class LoadItemsScript {
    constructor (private opts) {

    }

    public async init(args) {
        try {
            const data = await this.opts.customOpts.loader(args)
            this.opts.trigger('loadItems', 'done', data)
        }
        catch {
            console.log('error')
        }
    }

    public async update(args) {
        
    }
}