class LayersView extends Backbone.View {

    constructor(options) {
        options = options || {};

        _.defaults(options, {
            'className': 'comp-layers',
            'events': {}
        });

        super(options);
    }

    initialize(options) {
        this.template = _.template(tmplLayers);
        this.items = new Backbone.Collection(options.items && options.items.length ? options.items : [ItemModel.prototype.defaults()]);
        this.$lists = null;
    }

    render() {

        this.$el.html(this.template());
        this.$lists = this.$el.find('[data-name="lists"]');
        this.items.forEach(this._addListView.bind(this, false));

        return this.$el;
    }

    _addListView(animated, item) {

        let view = new ListView({
            model: new ItemModel(item.toJSON())
        });

        view.render().appendTo(this.$lists);
    }

    _getActiveItem() {
        return this.items.at(this.items.length - 1);
    }
}
