import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}
interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: ICheckInsRepository
  ) { }

  async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(userId, new Date())

    if(checkInOnSameDay){
      throw new Error()
    }

    const checkIn = await this.checkInRepository.create(
      {
        gym_Id: gymId,
        user_Id: userId
      }
    )
    return {checkIn} 
  }
}