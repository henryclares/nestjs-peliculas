import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntityClass extends BaseEntity {
  @Column({
    name: '_estado',
    length: 30,
    type: 'varchar',
    nullable: false,
    comment: 'Estado del registro',
  })
  estado: string;

  @Column('bigint', {
    name: '_usuario_creacion',
    nullable: false,
    comment: 'Id de usuario que creó el registro',
  })
  usuarioCreacion: string;

  @CreateDateColumn({
    name: '_fecha_creacion',
    type: 'timestamp without time zone',
    nullable: false,
    default: () => 'now()',
    comment: 'Fecha de creación',
  })
  fechaCreacion: Date;

  @Column('bigint', {
    name: '_usuario_modificacion',
    nullable: true,
    comment: 'Id de usuario que realizo una modificación',
  })
  usuarioModificacion?: string | null;

  @UpdateDateColumn({
    name: '_fecha_modificacion',
    type: 'timestamp without time zone',
    nullable: true,
    comment: 'Fecha en que se realizo una modificación',
  })
  fechaModificacion?: Date | null;

  protected constructor(data?: Partial<BaseEntityClass>) {
    super();
    if (data) Object.assign(this, data);
  }
}
