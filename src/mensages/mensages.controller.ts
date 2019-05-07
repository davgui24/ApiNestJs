import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from '../services/mensajes/mensajes.service';


@Controller('mensajes')
export class MensajesController {


    constructor(private mensajesService: MensajesService){

    }
 
    @Post()
    create(@Body() createMensajeDto: CreateMensajeDto, @Res() response){
        this.mensajesService.createMensaje(createMensajeDto).then( mensajeNuevo => {
          response.status(HttpStatus.CREATED).json(mensajeNuevo)
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json('Error en el creación del mensaje');
        });
    }

    @Get()
    getAll(@Res() response){
        this.mensajesService.getAll().then( mensajesList => {
            response.status(HttpStatus.OK).json(mensajesList)
          }).catch(() => {
              response.status(HttpStatus.FORBIDDEN).json('Error al listar los mesajes');
          });
    }


    @Put(':id')
    update(@Body() updatMensajeDto: CreateMensajeDto, @Res() response, @Param('id') idMensaje){
       this.mensajesService.updateMensaje(idMensaje, updatMensajeDto).then(mensajeActualizado => {
           response.status(HttpStatus.OK).json(mensajeActualizado)
       }).catch(() => {
        response.status(HttpStatus.FORBIDDEN).json('Error al actualizar le mensaje');
       });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensaje){
        this.mensajesService.deleteMensaje(idMensaje).then(res => {
            response.status(HttpStatus.OK).json(res)
        }).catch(() => {
         response.status(HttpStatus.FORBIDDEN).json('Error al eliminar le mensaje');
        });
    }


}
