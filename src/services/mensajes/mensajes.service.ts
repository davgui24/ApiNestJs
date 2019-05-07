import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensaje } from '../../mensages/entities/mensaje.entity';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from '../../mensages/dto/create-mensaje-dto';

@Injectable()
export class MensajesService {
  constructor(
    @InjectRepository(Mensaje)
    private readonly mensajeRepository: Repository<Mensaje>,
  ) {}

  async getAll(): Promise<Mensaje[]>{
    return await this.mensajeRepository.find();
  }

//   ------------------

  async createMensaje(mensajeNuevo: CreateMensajeDto): Promise<Mensaje>{
    const nuevo = new Mensaje();
    nuevo.mensage = mensajeNuevo.mensaje;
    nuevo.nick = mensajeNuevo.nick;

    return this.mensajeRepository.save(nuevo);
  }

  //   ------------------

  async updateMensaje(idMensaje: number, mensajeActualizar: CreateMensajeDto): Promise<Mensaje>{
    const mensajeUpdate = await this.mensajeRepository.findOne(idMensaje);
    mensajeUpdate.mensage = mensajeActualizar.mensaje;
    mensajeUpdate.nick = mensajeActualizar.nick;

    return this.mensajeRepository.save(mensajeUpdate)
  }


  async deleteMensaje(idMensaje: number): Promise<any>{
    return await this.mensajeRepository.delete(idMensaje);

  }
}
