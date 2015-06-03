import Backbone from "backbone";
import ItemModel from "es6!models/item";
import tmplList from "text!templates/list.jst"

class ListView extends Backbone.View {

    constructor(options) {
        options = options || {};

        _.defaults(options, {
            className: 'layers-list',
            tagName: 'ul',
            events: {
                'dblclick [data-dblclick]': '_handleDomEvents',
                'click [data-click]': '_handleDomEvents',
                'focusout [data-focusout]': '_handleDomEvents',
                'focusin [data-focusin]': '_handleDomEvents',
                'keypress [data-keypress]': '_handleDomEvents'
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
        let $list = this.$el.html(this.template(this.model.toJSON())),
            $listItems = $list.children('[data-name="item"]'),
            items = this.model.items;

        items.forEach((item, i) => {
            $listItems.eq(i).data('dataItem', item);
        });

        return this.$el;
    }

    _handleDomEvents(e) {
        let type = e.type,
            $t = $(type === 'click' ? e.currentTarget : e.target),
            $item = $t.parents('[data-name="item"]:eq(0)'),
            item = $item.data('dataItem'),
            cmd = $t.data(type),
            reRender = false;

        if (type === 'dblclick') {

        } else if (type === 'click') {

            switch (cmd) {

                case 'edit':
                    $item.find('[data-name="desc"]:eq(0)').attr('contenteditable', true).focusin();
                    break;

                case 'delete':
                    break;
            }

        } else if (type === 'focusout') {

            switch (cmd) {
                case 'endEdit':
                    item.set({
                        description: $t.text().trim()
                    }, {
                        silent: true
                    });
                    break;

                case 'endAdd':
                    $t.text($t.data('placeholder'));
                    break;
            }
        } else if (type === 'focusin') {

            switch (cmd) {
                case 'startAdd':
                    $t.text('');
                    break;

                case 'startEdit':
                    window.setTimeout(() => {
                        let sel, range;

                        if (window.getSelection && document.createRange) {
                            range = document.createRange();
                            range.selectNodeContents(e.target);
                            range.collapse(false);
                            sel = window.getSelection();
                            sel.removeAllRanges();
                            sel.addRange(range);
                        } else if (document.body.createTextRange) {
                            range = document.body.createTextRange();
                            range.moveToElementText(e.target);
                            range.collapse(false);
                            range.select();
                        }
                    }, 200);
                    break;
            }

        } else if (type === 'keypress') {

            if ((e.which || e.keyCode || e.charCode) === 13) {
                let desc = $t.text().trim();

                if (desc) {
                    this.model.items.add({
                        description: desc
                    });
                }
            }
        }

    }

}

export default ListView;