class LayersView extends Backbone.View {

    constructor(options) {
        options = options || {};

        _.defaults(options, {
            className: 'comp-layers'
        });

        super(options);
    }

    initialize() {}

    render() {
        console.log(this.className);
        this.$el.html('<h1>welcome1</h1>')
        return this.$el;
    }
}
