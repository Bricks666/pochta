export const toValidUser = (user )=> {
  return {
    name: user.Address,
    role: +user.role,
    address: user.homeAddress,
    fio: user.FIO,
    acceptMail: user.acceptMail
  }
}
