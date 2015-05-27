class GroupModel extends Backbone.Model {

    constructor(options) {
        options = options || {};
        _.defaults(options, {
            defaults: {
                description: '',
                groups: null
            }
        })

        super(options);
    }
}
