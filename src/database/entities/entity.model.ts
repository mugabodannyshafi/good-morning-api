import {
    Column,
    BeforeUpdate,
    BeforeInsert,
    BeforeRemove,
    BaseEntity,
  } from 'typeorm';
  import { DateTime } from 'luxon';
  
  export class EntityModel extends BaseEntity {
    @Column({
      type: 'int',
      nullable: false,
    })
    created_at: number;
  
    @Column({ type: 'int', nullable: true })
    updated_at?: number;
  
    @Column({ type: 'int', nullable: true })
    deleted_at?: number;
  
    @BeforeUpdate()
    public setUpdatedAt() {
      this.updated_at = DateTime.now().toUnixInteger();
    }
  
    @BeforeInsert()
    public setCreatedAt() {
      this.created_at = DateTime.now().toUnixInteger();
    }
  
    @BeforeRemove()
    public setDeletedAt() {
      this.deleted_at = DateTime.now().toUnixInteger();
    }
  }
