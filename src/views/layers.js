class LayersView extends Backbone.View {

    constructor(options) {
        options = options || {};

        _.defaults(options, {
            className: 'comp-layers',
            attributes: {
                'data-attr': 'test'
            }
        });

        super(options);
    }

    initialize() {
        this.template = _.template(tmplLayers);
    }

    render() {
        this.$el.html(this.template());
        return this.$el;
    }
}
