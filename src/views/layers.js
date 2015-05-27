class LayersView extends Backbone.View {

    constructor(options) {
        options = options || {};

        _.defaults(options, {
            className: 'comp-layers'
        });

        super(options);
    }

    initialize(options) {
        this.template = _.template(tmplLayers);
        this.groups = new Backbone.Collection(options.groups && options.groups.length ? options.groups : [GroupModel.prototype.defaults]);
    }

    render() {
        let $lists;

        this.$el.html(this.template());
        $lists = this.$el.find('[data-name="lists"]');

        this.groups.forEach(group => {

            let view = new ListView({
                model: new GroupModel(group.toJSON());
            });

            view.render().appendTo($lists);
        });

        return this.$el;
    }
}
