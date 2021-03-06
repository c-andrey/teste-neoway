import cpf from 'node-cpf';
import { Cpf } from '../Models/CpfModel';
import { BaseRequestDto } from './BaseDto';
export class CpfRequestDto extends BaseRequestDto<Cpf> {
    constructor(public _number: string, public _blocked: boolean = false) {
        super();
        this.validateCpf();
        this.sanitirizeCpf();
    }

    get number(): string {
        return cpf.unMask(this._number);
    }

    validateCpf() {
        if (!cpf.validate(this._number)) {
            throw new Error('Cpf Inválido');
        } else return true;
    }

    sanitirizeCpf() {
        if (this._number.search('.') !== -1) {
            this._number = cpf.unMask(this._number);
        }
    }

    getInstance() {
        return {
            number: this.number,
            blocked: this._blocked,
        };
    }
}

export class CpfResponseDto extends Cpf {
    public number: string;
    public blocked: boolean;
    public id: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(init: Partial<Cpf>) {
        super();
        this.id = init._id;
        this.createdAt = init.createdAt;
        this.updatedAt = init.updatedAt;
        this.blocked = init.blocked;
        this.number = cpf.mask(init.number);
    }
}
