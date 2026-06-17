import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor (private readonly prisma : PrismaService) {}

  // 체크아웃 메소드(유저아이디 받음)
  async checkout(userId:number) {
    //1 카트 아이템 목록을 조회
    const cart = await this.prisma.cartItem.findMany({
      where: {userId: userId},
      include: {product: {select: {id: true, name: true, price: true}}}
    });
    if(cart.length === 0) {
      throw new BadRequestException("장바구니가 비어서 주문을 할수 없습니다.")
    }

    // 2 트랜젝션을 감싸서 박업할 준비
    return this.prisma.$transaction(async (tx) => {
      let total = 0;  // 주문 전체 가격을 업데이트
      // 카트 아이템 -> 오더아이템 에 옮길 변수
      const itemData : {
        productId : number;
        quantity : number;
        unitPrice: number
      } [] = [];  // 이거는 배열이고 빈 배열로 넣을거임

      // 카트 정보를 하나씩 돌면서 무언가 계산
      for(const item of cart){
        //1. 재고 차감 from Product
        const updated = await tx.product.updateMany({
          where: {id: item.productId, stock: {gte : item.quantity}},
          data : {stock: {decrement: item.quantity}}
        }); //update product set stock = item.quanity where id = item.productId and stock < item.quantiy
        //2. updated = 0 => 재로가 없으면 못팜
        if(updated.count === 0) {
          throw new ConflictException(`재고가 부족합니다. ${item.product.name}`)
        }
        total += item.product.price * item.quantity;  //order 총 주문금액
        //orderItem 에 담을 준비
        itemData.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.product.price
        });
      } //end of for
      // 3 create order
      // 오더테이블
      const order = await tx.order.create({
        data : {
          buyerId: userId,
          totalPrice: total,
          items: {create: itemData} // create OrderItems 자동으로 (오더가 생성될때)
        },
        // 반환
        include: {items: true}  // 주문을 생성한 다음에 주문 상세항목 까지 같이 보여줘
      });

      // 4 장바구니 비우기
      await tx.cartItem.deleteMany({where: {userId}});
    });
  }

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
