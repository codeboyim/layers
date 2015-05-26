class GroupModel extends Backbone.Model {

    constructor() {

        super();

        this.defaults = {
            description: '',
            groups: null,
            items: null
        };
    }
}
