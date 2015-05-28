class ListView extends Backbone.View {

    constructor(options) {
        options = options || {};

        _.defaults(options, {
            className: 'comp-layers-list',
            events: {
                'dblclick [data-dblclick]': '_handleDomEvents',
                'focusout [contenteditable]': '_handleDomEvents',
                'focusin [data-name=newItem]': '_handleNewItemEvents',
                'focusout [data-name=newItem]': '_handleNewItemEvents',
                'keypress [data-name=newItem]': '_handleNewItemEvents'
            }
        });

        super(options);
    }

    initialize(options) {

        this.model = options.model || new ItemModel;
        this.template = _.template(tmplList, null, {
            variable: 'data'
        });

        this.model.items.on('all', this.render, this);
    }

    render() {
        let $list = $(this.template(this.model.toJSON())),
            $listItems = $list.children(),
            items = this.model.items.toJSON();

            console.log(items.length);

        if (_.isArray(items)) {
            _.each(items, function(item, i) {
                $listItems.eq(i).data('dataItem', item);
            })
        }

        this.$el.html(this.template(this.model.toJSON()));
        return this.$el;
    }

    _handleDomEvents(e) {
        let type = e.type,
            $t = $(type === 'click' ? e.currentTarget : e.target),
            item;

        if (type === 'dblclick') {

        } else if (type === 'click') {

        } else if (type === 'focusout') {

        }
    }

    _handleNewItemEvents(e) {
        let $newItem = $(e.target),
            desc;

        e.stopPropagation();

        switch (e.type) {
            case 'focusin':
                $newItem.text('');
                break;

            case 'focusout':
                $newItem.text($newItem.data('placeholder'));
                break;

            case 'keypress':
                if ((e.which || e.keyCode || e.charCode) === 13) {
                    e.preventDefault();

                    if ((desc = $newItem.text()).trim()) {

                        this.model.items.add({
                            description: desc
                        });

                        $newItem.blur().focusout();
                    }
                }
                break;

        }
    }
}
