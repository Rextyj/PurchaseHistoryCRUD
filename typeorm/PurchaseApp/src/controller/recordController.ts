import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Records } from '../entity/Records';
import { Users } from '../entity/Users';

export async function getRecords(request: Request, response: Response) {
    const recordRepository = getManager().getRepository(Records);

    const record = await recordRepository.find();

    response.send(record);
}

export async function saveRecord(request: Request, response: Response) {
    const entityManager = getManager();
    const recordRepository = entityManager.getRepository(Records);
    const userRepository = entityManager.getRepository(Users);
    var dataIn = request.body;
    try {
        var user = await userRepository.find({ username: dataIn.Owner });
        if(user.length == 0) {
            throw Error();
        }
        var userId = user[0].id;
        // console.log("user id is ", userId);
        dataIn["user"] = userId;
        // console.log(dataIn);
        const newRecord = recordRepository.create(dataIn);

        const record = await recordRepository.save(newRecord);
        response.send(record);
    } catch (error) {
        console.log(error);
        response.send({ data: 'Error' });
    }
}

export async function deleteRecord(request: Request, response: Response) {
    const entityManager = getManager();
    const recordRepository = entityManager.getRepository(Records);
    var dataIn = request.body;
    try {
        var recordToDelete = await recordRepository.findByIds([dataIn.id]);
        console.log(recordToDelete);
        const record = await recordRepository.remove(recordToDelete);
        response.send({data: "Deleted an item"});
    } catch (error) {
        console.log(error);
        response.send({ data: 'Error' });
    }
}

export async function getAverage(request: Request, response: Response) {
    const entityManager = getManager();
    const userRepository = entityManager.getRepository(Users);
    var dataIn = request.body;
    console.log(dataIn);
    var user = await userRepository.find({ username: dataIn.owner });
    console.log(user);
    // var averageData = await entityManager.query(`select COUNT(company_name),company_name, SUM(Number_of_shares_bought) as avgNumBought ,SUM(Number_of_shares_sold) as avgNumSold, 
    // AVG(Purchase_price) as avgPrice, AVG(Sold_price) as avgSoldPrice, AVG(Loss_or_gain_price) as avgLossGain from records where user_id = ? GROUP BY company_name `, [user[0].id]);

    var averageData = await entityManager
                            .createQueryBuilder()
                            .select("COUNT(company_name)", "count")
                            .addSelect("company_name")
                            .addSelect("SUM(Number_of_shares_bought)", "totalNumBought")
                            .addSelect("SUM(Number_of_shares_sold)", "totalNumSold")
                            .addSelect("AVG(Purchase_price)", "avgPrice")
                            .addSelect("AVG(Sold_price)", "avgSoldPrice")
                            .addSelect("AVG(Loss_or_gain_price)", "avgLossGain")
                            .from(Records, "records")
                            .where("user_id = :id", {id: user[0].id} )
                            .groupBy("company_name")
                            .getRawMany();
    console.log(averageData);
    response.send(averageData);
}

export async function getBetweenDate(request: Request, response: Response) {
    const entityManager = getManager();
    const userRepository = entityManager.getRepository(Users);
    var dataIn = request.body;
    console.log(dataIn);
    var user = await userRepository.find({ username: dataIn.owner });
    console.log(user);
    // "Select * from records where user_id = :id and date_purchased between to_date(:beginDate, 'YYYY-MM-DD') and to_date(:endDate, 'YYYY-MM-DD')"
    var betweenData = await entityManager
                            .createQueryBuilder()
                            // .select("records")
                            .from(Records, "records")
                            .where("user_id = :id", {id: user[0].id} )
                            .andWhere("date_purchased between to_date(:beginDate, 'YYYY-MM-DD') and to_date(:endDate, 'YYYY-MM-DD')", {beginDate: dataIn.date.beginningDate, endDate: dataIn.date.endDate})
                            .getRawMany();
    console.log(betweenData);
    response.send(betweenData);
}

export async function getMonthlyData(request: Request, response: Response) {
    const entityManager = getManager();
    const userRepository = entityManager.getRepository(Users);
    var dataIn = request.body;
    console.log(dataIn);
    var user = await userRepository.find({ username: dataIn.owner });
    console.log(user);
    // Select to_char(date_purchased, 'MM') as mon, sum(purchase_price) as totalPrice from RECORDS where user_id=?2 and to_char(date_purchased, 'YYYY') = ?1 group by 1 order by mon asc
    var monthlyData = await entityManager
                            .createQueryBuilder()
                            .select("to_char(date_purchased, 'MM')", "mon")
                            .addSelect("sum(purchase_price)", "totalPrice")
                            .from(Records, "records")
                            .where("user_id = :id", {id: user[0].id} )
                            .andWhere("to_char(date_purchased, 'YYYY') = :year", {year: dataIn.year})
                            .groupBy("mon")
                            .orderBy("mon", "ASC")
                            .getRawMany();
    console.log(monthlyData);
    response.send(monthlyData);
}


export async function getData(request: Request, response: Response) {
    const entityManager = getManager();
    const userRepository = entityManager.getRepository(Users);
    var dataIn = request.body;
    console.log(dataIn);
    var user = await userRepository.find({ username: dataIn.owner });
    console.log(user);
    // Select sum(purchase_price) as totalPrice, sum(sold_price) as soldPrice, sum(loss_or_gain_price) as lossGain from RECORDS where user_id=?2 and to_char(date_purchased, 'YYYY') = ?1 
    var data = await entityManager
                            .createQueryBuilder()
                            .select("sum(purchase_price)", "totalPrice")
                            .addSelect("sum(sold_price)", "soldPrice")
                            .addSelect("sum(loss_or_gain_price)", "lossGain")
                            .from(Records, "records")
                            .where("user_id = :id", {id: user[0].id} )
                            .andWhere("to_char(date_purchased, 'YYYY') = :year", {year: dataIn.year})
                            .getRawMany();
    console.log(data);
    response.send(data);
}

export async function getCompanyData(request: Request, response: Response) {
    const entityManager = getManager();
    const userRepository = entityManager.getRepository(Users);
    var dataIn = request.body;
    console.log(dataIn);
    var user = await userRepository.find({ username: dataIn.owner });
    console.log(user);
    // select company_name, sum(purchase_price) as totalPrice from records where user_id=?1 group by 1
    var companyData = await entityManager
                            .createQueryBuilder()
                            .select("company_name")
                            .addSelect("sum(purchase_price)", "totalPrice")
                            .from(Records, "records")
                            .where("user_id = :id", {id: user[0].id} )
                            .groupBy("company_name")
                            .getRawMany();
    console.log(companyData);
    response.send(companyData);
}

export async function getShareData(request: Request, response: Response) {
    const entityManager = getManager();
    const userRepository = entityManager.getRepository(Users);
    var dataIn = request.body;
    console.log(dataIn);
    var user = await userRepository.find({ username: dataIn.owner });
    console.log(user);
    // select company_name, sum(number_of_shares_bought - number_of_shares_sold) as sharesRemain from records where user_id=?1 group by 1
    var shareData = await entityManager
                            .createQueryBuilder()
                            .select("company_name")
                            .addSelect("sum(number_of_shares_bought - number_of_shares_sold)", "sharesRemain")
                            .from(Records, "records")
                            .where("user_id = :id", {id: user[0].id} )
                            .groupBy("company_name")
                            .getRawMany();
    console.log(shareData);
    response.send(shareData);
}