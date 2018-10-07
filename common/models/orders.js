'use strict';
var app = require('../../server/server');
//var placesM = require('./places.js');
console.log(app.models);

module.exports = function(Orders) {
    const placeModel = app.models.places,
    //place = app.model(placesM);
    guideModel = app.models.guides,
    exModel = app.models.excursions; 

    Orders.getOrderStatus = async (id,cb) => {
        console.log(placeModel);
    let order = await Orders.findOne({
        where:{
            "_id":id
        }
    }
    );
    let p = await placeModel.findOne({
        where:{
            "lang":"ru"
        }
    }
    );
    
       console.log(p);
/*
        let _price;
        for (let i=0; i<excursion.prices.length; i++){
            if (order.people >= excursion.prices[i].people[0] && order.people <= excursion.prices[i].people[1]){
                _price = excursion.prices[i].price;
                break;
            }
        }
        if (order.people >= excursion.prices[excursion.prices.length-1].people[0] && excursion.prices[excursion.prices.length-1].people[1] == 0)
            _price = excursion.prices[excursion.prices.length-1].price;
           */ 
        cb(null,order,p);

    
};
/*
Orders.rateExcursion = async (req, res) => {
    let order = await orderModel.getOrder(req.params.id),
        guide = await guideModel.getGuide(order.excursion.guide);
    order.mark = req.body.star;
    if (order.mark === 5) {
        guide.info.happy++;
        await guide.save();
    }
    await order.save();
    req.flash('success', 'Спасибо за оценку!');
    res.redirect('/');
}

Orders.cancelExcursion = async (req, res) => {
    let order = await orderModel.getOrder(req.body._id);
    order.mark = 0;
    if (order.status === 0) order.status = 3;
    else if (order.status === 1) order.status = 5;
    await order.save();
    req.flash('error', 'Экскурсия отменена');
    res.redirect('/');
}
*/
Orders.remoteMethod(
    'getOrderStatus',
    {
        http:{path:'/status', verb:'get'},
        accepts:{arg:'id', type:'string'},
        returns:{arg:'status',type:'string'}
    }
)

};


