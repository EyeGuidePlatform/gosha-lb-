'use strict';

module.exports = function(Orders) {
    const placeModel = require('loopback').getModel('places'),
    guideModel = require('loopback').getModel('guides'),
    exModel = require('loopback').getModel('excursions'); 

    Orders.getOrderStatus = async (id) => {
    let order = await Orders.findOne({
        where:{
            "_id":id
        }
    }
    );
    let place = await placeModel.findOne({
        where:{
            "id": order.place
        }
    }
    );
    let excursion = await exModel.findOne({
        where:{
            "id":order.excursion
        }
    }
    );
    let guide = await guideModel.findOne({
        where:{
        "id": excursion.guide
        }
    }
    );
    
    let _price;
    for (let i=0; i<excursion.prices.length; i++){
        if (order.people >= excursion.prices[i].people[0] && order.people <= excursion.prices[i].people[1]){
            _price = excursion.prices[i].price;
            break;
        }
    }
    if (order.people >= excursion.prices[excursion.prices.length-1].people[0] && excursion.prices[excursion.prices.length-1].people[1] == 0)
        _price = excursion.prices[excursion.prices.length-1].price;
        

        return [{'place':place},{'order':order},{'guide':guide},{'price':_price}];

    
};

Orders.rateExcursion = async (id,star) => {
       let order = await Orders.findOne({
        where:{
            "_id":id
        }
    }
    );
    let excursion = await exModel.findOne({
        where:{
            "id":order.excursion
        }
    }
    );
    let guide = await guideModel.findOne({
        where:{
        "id": excursion.guide
        }
    }
    );
    order.mark = star;
    if (order.mark === 5) {
        guide.info.happy++;
        await guide.save();
    }
    await order.save();
    //req.flash('success', 'Спасибо за оценку!'); //не знаю, что с этим делать
    //res.redirect('/');
}

Orders.cancelExcursion = async (id) => {
    let order = await Orders.findOne({
        where:{
            "_id":id
        }
    }
    );
    order.mark = 0;
    if (order.status === 0) order.status = 3;
    else if (order.status === 1) order.status = 5;
    await order.save();
    //req.flash('error', 'Экскурсия отменена');
    //res.redirect('/');
}

Orders.remoteMethod(
    'getOrderStatus',
    {
        http:{path:'/getOrderStatus', verb:'get'},
        accepts:{arg:'id', type:'string'},
        returns:{arg:'status',type:'array'}
    }
);
Orders.remoteMethod(
    'rateExcursion',
    {
        http:{path:'/rateExcursion', verb:'get'},
        accepts:[
            {arg:'id', type:'string'},
            {arg:'star', type:'number'}
        ],
    }
);
Orders.remoteMethod(
    'cancelExcursion',
    {
        http:{path:'/cancelExcursion', verb:'post'},
        accepts:{arg:'id', type:'string'}
        
    }
)


};


