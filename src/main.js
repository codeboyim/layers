class Layers {

    constructor(options) {
        let container = options && options.container;

        if (!container) {
            throw 'please specify the DOM element which this component will be appended to';
        }

        (new LayersView).render().appendTo($(container));
    }

}