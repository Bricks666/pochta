pragma solidity 0.8.13;
pragma abicoder v2;

contract Users {
    enum Role { USER, POSTMAN, ADMIN, MAIN_ADMIN }
    struct User {
        address Address;
        string homeAddress;
        string FIO;
        Role role;
        bool acceptMail;
        string idMailPost;
    }

    address[] public usersAddress;
    mapping (address => User) public users;
    address[] public admins;
    event newUser(address user);
    event changeInfo(address indexed user);

    constructor() {
        users[0xAf23ad742D7C52c2a0768eF61757B2e41F94D947] = User({
            Address:0xAf23ad742D7C52c2a0768eF61757B2e41F94D947,
            homeAddress: "asdfasdfasdf",
            FIO: "asdasdf",
            role: Role.ADMIN,
            acceptMail: true,
            idMailPost: ""
        });
        users[0xc97E2f334315eb44ea6a14A51C4Ca83b74888FF6] = User({
            Address: 0xc97E2f334315eb44ea6a14A51C4Ca83b74888FF6,
            homeAddress: "asdfadfasdf",
            FIO:"adfasdfasdfaswddf",
            role: Role.POSTMAN,
            acceptMail: false,
            idMailPost: "asdf"
        });
        users[0x1ff7E5a292b7ad77d373b6a863b0cD422Fc0B383] = User({
            Address: 0x1ff7E5a292b7ad77d373b6a863b0cD422Fc0B383,
            homeAddress: "asdfadfasdf",
            FIO:"adfasdfasdfaswddf",
            role: Role.USER,
            acceptMail: true,
            idMailPost: ""
        });

        usersAddress.push(0xAf23ad742D7C52c2a0768eF61757B2e41F94D947);
        usersAddress.push(0xc97E2f334315eb44ea6a14A51C4Ca83b74888FF6);
        usersAddress.push(0x1ff7E5a292b7ad77d373b6a863b0cD422Fc0B383);

        admins.push(0xAf23ad742D7C52c2a0768eF61757B2e41F94D947);
    }

    function getUsers() external view returns(address[] memory) {
        return usersAddress;
    }

    function getUser(address user) external view returns(User memory) {
        return users[user];
    }

    function getAdmins() external view returns(address[] memory) {
        return admins;
    }
    function registration(string memory homeAddress, string memory FIO) external {
        require(users[msg.sender].Address == address(0), "You are alreagy registered");
        usersAddress.push(msg.sender);
        users[msg.sender] = User(msg.sender, homeAddress, FIO, Role.USER, true, "");
        emit newUser(msg.sender);
    }
    function addAdmin(address AddressToAdmin) external {
        require(users[msg.sender].role == Role.MAIN_ADMIN, "You are not an admin");
        require(users[AddressToAdmin].role < Role.ADMIN, "User is already admin");
        users[AddressToAdmin].role = Role.ADMIN;
        admins.push(AddressToAdmin);
        emit changeInfo(AddressToAdmin);
    }
    function changeUserInfo(string memory homeAddress, string memory fio, bool acceptMail) external {
        require(users[msg.sender].Address != address(0), "You are not registered");
        users[msg.sender].homeAddress = homeAddress;
        users[msg.sender].FIO = fio;
        users[msg.sender].acceptMail = acceptMail;
        emit changeInfo(msg.sender);
    }

    // Посмотри еще раз на логику функций ниже и задание, помоему тут не очень что то
    // Я не смотрел еще раз задание, поправь меня, если что то не так понимаю
    function addPostman(address Address, string memory idMailPost) external {
        require(users[msg.sender].role == Role.ADMIN, "Check your role");
        require(users[Address].role != Role.POSTMAN, "Address is already a postman");
        users[Address].role = Role.POSTMAN;
        users[Address].idMailPost = idMailPost;
        emit changeInfo(Address);
    }
    function delPostman(address Address) external {
        require(users[msg.sender].role == Role.ADMIN, "Check your role");
        require(users[Address].role == Role.POSTMAN, "Address is not address postman");
        users[Address].role = Role.USER;
        users[Address].idMailPost = "";
        emit changeInfo(Address);
    }
    // А вот это не особо понял
    function changeIDMailPost(address Address, string memory newIdMailPost) external {
        require(users[msg.sender].role == Role.ADMIN, "Check your role");
        require(users[Address].role == Role.POSTMAN, "Address is address postman");
        users[Address].idMailPost = newIdMailPost;
        emit changeInfo(Address);
    }
}

contract Packages is Users {
    enum PackageClass {
        FIRST,
        SECOND,
        THIRD
    }

    enum TypePackage {
        LETTER, PACKAGE, PARCEL
    }

    enum PackageStatus { WAIT_FOR_PAY, DELIVERY, CANCELED, ACCEPTED }

    struct PackagePresonalData {
        address sender;
        address receiver;
        string addressSender;
        string addressReceiver;
    }

    struct PrePackagePresonalData {
        address sender;
        address receiver;
    }
    struct PackageType {
        TypePackage typePackage;
        PackageClass packageClass;
    }
    struct PackageDelivery {
        uint weight;
        uint deliveryPrice;
        uint valuePackage;
        uint deliveryTime;
        uint allPrice;
    }
    struct Package {
        uint id;
        string trackNumber;
        PackagePresonalData personalData;
        PackageType packageType;
        PackageDelivery delivery;
        PackageStatus status;
    }

    Package[] public packages;

    event newPackage(uint id, address indexed sender, address indexed receiver);
    event changePackageStatus(uint id, address indexed sender, address indexed receiver, PackageStatus newStatus);


    function getPackages() external view returns(Package[] memory){
        return packages;
    }
    function addPackage(
        PrePackagePresonalData memory personalData,
        PackageType memory packageType,
        PackageDelivery memory packageDelivery
        ) external {
        require(users[msg.sender].role == Role.POSTMAN, "You are not postman");
        require(packageDelivery.weight <= 100, "Weight is so big");// Последний ноль отвечает за знак после запятой
        packages.push(Package({
            id: packages.length,
            trackNumber: "",
            personalData: PackagePresonalData({
                sender: personalData.sender,
                receiver: personalData.receiver,
                addressSender: users[personalData.sender].homeAddress,
                addressReceiver: users[personalData.receiver].homeAddress
            }),
            packageType: packageType,
            delivery: packageDelivery,
            status: PackageStatus.WAIT_FOR_PAY
        }));
        emit newPackage(packages.length - 1, personalData.sender, personalData.receiver);
    }
    function payPackage(uint id) external payable {
        require(packages[id].status == PackageStatus.WAIT_FOR_PAY, "Package have already been paid");
        changeStatus(id, PackageStatus.DELIVERY);
    }
    function acceptPackage(uint id)external{
        require(packages[id].personalData.receiver == msg.sender);
        require(packages[id].status == PackageStatus.DELIVERY);
        changeStatus(id, PackageStatus.ACCEPTED);
    }
    function cancelPackage(uint id)external{
        require(packages[id].personalData.sender == msg.sender || packages[id].personalData.receiver == msg.sender) ;
        require(packages[id].status == PackageStatus.DELIVERY);
        changeStatus(id, PackageStatus.CANCELED);
    }

    function changeStatus(uint id, PackageStatus status) private {
        packages[id].status = status;
        emit changePackageStatus(id, packages[id].personalData.sender, packages[id].personalData.receiver, status);
    }

}

contract Transfers is Users {
    struct Transfer {
        uint id;
        address sender;
        address receiver;
        uint value;
        uint liveTime;
        uint timeSend;
        bool isFinish;
    }

    Transfer[] public transfers;
    event newTransfer(uint id, address indexed sender, address indexed receiver);
    event finishTransfer(uint indexed id, address sender, address receiver);


    function getTransfers() external view returns(Transfer[] memory) {
        return transfers;
    }

    function createTransfer(address receiver, uint liveTime, uint timeSend) external payable {
        require(users[msg.sender].Address != address(0), "You are not registered");
        require(msg.value != 0, "Check value");
        transfers.push(Transfer(transfers.length, msg.sender, receiver, msg.value, liveTime, timeSend, false));
        emit newTransfer(transfers.length - 1,msg.sender, receiver);
    }
    function acceptTransfer(uint id) external {
        require(transfers[id].receiver == msg.sender, "You are not an receiver");
        require(transfers[id].isFinish == false, "Transfer is finished");
        payable(msg.sender).transfer(transfers[id].value);
        finishTransferFunction(id);

    }
    function cancelTransfer(uint id) external {
        require(transfers[id].isFinish == false, "Transfer is finished");
        // payable(transfers[id].sender).transfer(transfers[id].value);
        finishTransferFunction(id);
    }
    function finishTransferFunction(uint id) private {
        transfers[id].isFinish = true;
        emit finishTransfer(id, transfers[id].sender, transfers[id].receiver);
    }

}


contract Pochta is Packages, Transfers {

        constructor(){
            // Допиши вот тут конструктор, чтобы по заданию было правильно
            // Почитай больше про наследование и как передавать данные в родителькие конструкторы
        }
}
