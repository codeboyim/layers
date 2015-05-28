class ItemModel extends Backbone.Model {

    initialize() {
        this.items = new Backbone.Collection(null, {
            model: ItemModel
        });

        this.items.on('all', () => {
            this.set('items', this.items.toJSON(), {
                silent: true
            });
        });

        this.on('change:items', () => {
            this.items.set(this.get('items'));
        });
    }

    defaults() {
        return {
            description: '',
            items: []
        };
    }
}
