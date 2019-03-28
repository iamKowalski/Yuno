module.exports = class TranslateFunctions {
    static azul(_números) {
        _números = _números.toString();
        var texto = ``,
            números = {
                1: '<:y1a:551095926639427603>',
                2: '<:y2a:551095926740090890>',
                3: '<:y3a:551095926866051073>',
                4: '<:y4a:551095927192944650>',
                5: '<:y5a:551095926794747906>',
                6: '<:y6a:551095927322968075>',
                7: '<:y7a:551095927213916201>',
                8: '<:y8a:551095927868227584>',
                9: '<:y9a:551095928178606100>',
                0: '<:y0a:551095926329180170>'
            };
        for (let i = 0; i < _números.length; i++)
            texto += números[parseInt(_números[i])];

        return texto
    }

    static laranja(_números) {
        _números = _números.toString();
        var texto = ``,
            números = {
                1: '<:y1:550814259634765851>',
                2: '<:y2:550814260133888000>',
                3: '<:y3:550814260234551310>',
                4: '<:y4:550814260515569664>',
                5: '<:y6:550814260440072216>',
                6: '<:y6:550814260440072216>',
                7: '<:y7:550814261270675456>',
                8: '<:y8:550814260922679307>',
                9: '<:y9:550814261253767190>',
                0: '<:y0:550814259861520395>'
            };
        for (let i = 0; i < _números.length; i++)
            texto += números[parseInt(_números[i])];

        return texto;
    }

    static animado(_números) {
        _números = _números.toString();
        var texto = ``,
            números = {
                1: '<a:yuno1:550059664214196235>',
                2: '<a:yuno2:550059663714942976>',
                3: '<a:yuno3:550059667712376842>',
                4: '<a:yuno4:550059668110704640>',
                5: '<a:yuno5:550059667594674207>',
                6: '<a:yuno6:550059669155086391>',
                7: '<a:yuno7:550059667749994497>',
                8: '<a:yuno8:550059667775291401>',
                9: '<a:yuno9:550059668488060932>',
                0: '<a:yuno0:550059664575037450>'
            };
        for (let i = 0; i < _números.length; i++)
            texto += números[parseInt(_números[i])];

        return texto;
    }
}
