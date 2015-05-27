class ListView extends Backbone.View {

    constructor(options) {
        options = options || {};

        _.defaults(options, {
            className: 'comp-layers-list',
            events: {
                'dblclick [data-dblclick]': '_domEvent',
                'focusout [contenteditable]': '_domEvent'
            }
        });

        super(options);
    }

    initialize(options) {

        this.model = options.model || new GroupModel;
        this.template = _.template(tmplList, null, {
            variable: 'data'
        });

        console.log(GroupModel.prototype.defaults);
    }

    render() {
        let $list = $(this.template(this.model.toJSON())),
            $listItems = $list.children(),
            groups = this.model.get('groups');

        if (_.isArray(groups)) {
            _.each(groups, function(group, i) {
                $listItems.eq(i).data('dataItem', group);
            })
        }

        this.$el.html(this.template(this.model.toJSON()));
        return this.$el;
    }

    _domEvent(e) {
        let type = e.type,
            $t = $(type === 'click' ? e.currentTarget : e.target),
            group;

        if (type === 'dblclick') {

        } else if (type === 'click') {

        } else if (type === 'focusout') {

        }
    }
}
