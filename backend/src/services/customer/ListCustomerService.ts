import prismaClient from "../../prisma";

class ListCustomerService {
  async execute() {
    const customers = await prismaClient.customer.findMany({
      include: {
        Groups: true,
      },
    });

    return customers;
  }
}

export { ListCustomerService };
