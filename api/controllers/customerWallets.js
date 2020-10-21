const uuidv4 = require('uuid/v4');

module.exports = app => {
    const customerWalletsDB = app.data.customerWallets;
    const controller = {};

    const {
        customerWallets: customerWalletsMock,
    } = customerWalletsDB;

    controller.listCustomerWallets = (req, res) => res.status(200).json(customerWalletsDB);

    controller.saveCustomerWallets = (req, res) => {
        customerWalletsMock.data.push({
            id: uuidv4(),
            parentId: uuidv4(),
            name: req.body.name,
            birthDate: req.body.birthDate,
            cellPhone: req.body.cellPhone,
            phone: req.body.phone,
            email: req.body.email,
            occupation: req.body.occupation,
            state: req.body.state,
        });

        res.status(201).json(customerWalletsMock);
    }

    controller.removeCustomerWallets = (req, res) => {
        const {
            customerId,
        } = req.params;

        if (findCustomerIndex(customerId) == -1) {
            res.status(404).json({
                message: 'Cliente não encontrado na base.',
                success: false,
                customerWallets: customerWalletsMock,
            });
        } else {
            customerWalletsMock.data.splice(findCustomerIndex(customerId), 1);
            res.status(200).json({
                message: 'Cliente econtrado e deletado com sucesso!',
                success: true,
                customerWallets: customerWalletsMock
            });
        }
    };

    controller.updateCustomerWallets = (req, res) => {
        const {
            customerId,
        } = req.params;

        // const foundCustomerIndex = customerWalletsMock.data.findIndex(customer => customer.id == customerId);

        if (findCustomerIndex(customerId) == -1) {
            res.status(404).json({
                message: 'Cliente não encontrado na base.',
                success: false,
                customerWallets: customerWalletsMock,
            });
        } else {
            const updatedCostumer = {
                id: customerId,
                parentId: req.body.parentId,
                name: req.body.name,
                birthDate: req.body.birthDate,
                cellPhone: req.body.cellPhone,
                phone: req.body.phone,
                email: req.body.email,
                occupation: req.body.occupation,
                state: req.body.state,
                createdAt: new Date(),
            };

            customerWalletsMock.data.splice(findCustomerIndex(customerId), 1, updatedCostumer);

            res.status(200).json({
                message: 'Cliente econtrado e alterado com sucesso!',
                success: true,
                customerWallets: customerWalletsMock
            });
        }
    }

    controller.getCustomerWalletById = (req, res) => {
        const {
            customerId,
        } = req.params;

        if (findCustomerIndex(customerId) == -1) {
            res.status(404).json({
                message: 'Cliente não encontrado na base.',
                success: false,
                customerWallets: customerWalletsMock,
            });
        } else {
            res.status(200).json({
                message: 'Cliente econtrado com sucesso!',
                success: true,
                customerWallets: customerWalletsMock.data[findCustomerIndex(customerId)],
            });
        }
    }

    function findCustomerIndex(customerId) {
        return customerWalletsMock.data.findIndex(customer => customer.id == customerId);
    }

    return controller;
}