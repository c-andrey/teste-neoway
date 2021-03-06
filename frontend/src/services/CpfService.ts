/* eslint-disable no-console */
import {
    CpfInterface,
    CpfListInterface,
    FilterInterface,
} from '../interfaces/CpfInterface';
import service from './ServiceAbstract';

const getCpf = async (
    cpf?: Partial<FilterInterface> | null,
): Promise<CpfListInterface[]> => {
    try {
        let params = {};
        if (cpf) {
            params = {
                number: cpf.number,
                id: cpf.id,
                blocked: cpf.blocked,
                sort: cpf.sort,
            };
        }
        const { data } = await service.get('/cpf', {
            params,
        });
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
const postCpf = async (cpf: CpfInterface): Promise<CpfInterface> => {
    try {
        const { data } = await service.post('/cpf', cpf);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const putCpf = async (cpf: CpfInterface): Promise<CpfListInterface> => {
    try {
        const { data } = await service.put(`/cpf/${cpf.id}`, cpf);

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteCpf = async (id: string): Promise<boolean> => {
    try {
        const { data } = await service.delete(`/cpf/${id}`);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default { getCpf, postCpf, putCpf, deleteCpf };
