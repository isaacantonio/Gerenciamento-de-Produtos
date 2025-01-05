'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import api from '../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const productSchema = z.object({
    nome: z.string().nonempty('O nome é obrigatório'),
    preco: z.number().nonnegative('O preço deve ser positivo'),
    quantidade: z.number().int().nonnegative('A quantidade deve ser zero ou positiva'),
});

type ProductForm = z.infer<typeof productSchema>;

type FormProductProps = {
    productId?: number;
    onClose: () => void;
};

export default function FormProduct({ productId, onClose }: FormProductProps) {
    const queryClient = useQueryClient();
    const { control, handleSubmit, formState: { errors }, setValue } = useForm<ProductForm>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            nome: '',
            preco: 0,
            quantidade: 0,
        },
    });

    const { mutate } = useMutation<void, Error, ProductForm>({
        mutationFn: async (data: ProductForm) => {
            if (productId) {
                await api.put(`/produtos/${productId}`, data);
            } else {
                await api.post('/produtos', data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            onClose();
        },
    });

    const onSubmit = (data: ProductForm) => {
        mutate(data);
    };

    const fetchProduct = async () => {
        if (productId) {
            const response = await api.get(`/produtos/${productId}`);
            const product = response.data;
            setValue('nome', product.nome || '');
            setValue('preco', product.preco ? parseFloat(product.preco) : 0);
            setValue('quantidade', product.quantidade ? parseInt(product.quantidade, 10) : 0);
        }
    };

    React.useEffect(() => {
        fetchProduct();
    }, [productId]);

    return (
        <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Nome</label>
                <Controller
                    name="nome"
                    control={control}
                    render={({ field }) => (
                        <InputText {...field} className={errors.nome ? 'p-invalid' : ''} />
                    )}
                />
                {errors.nome && <small className="p-error">{errors.nome.message}</small>}
            </div>

            <div>
                <label>Preço</label>
                <Controller
                    name="preco"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <InputNumber
                                value={field.value}
                                onValueChange={(e) => field.onChange(e.value || 0)}
                                mode="currency"
                                currency="BRL"
                                locale="pt-BR"
                                inputClassName={fieldState.error ? 'p-invalid' : ''}
                                onFocus={(e) => e.target.select()}
                            />
                            {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                        </>
                    )}
                />
            </div>

            <div>
                <label>Quantidade</label>
                <Controller
                    name="quantidade"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <InputNumber
                                value={field.value}
                                onValueChange={(e) => field.onChange(e.value || 0)}
                                mode="decimal"
                                useGrouping={false}
                                minFractionDigits={0}
                                maxFractionDigits={0}
                                inputClassName={fieldState.error ? 'p-invalid' : ''}
                            />
                            {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                        </>
                    )}
                />
            </div>

            <Button label="Salvar" type="submit" className='save-button-form' />
        </form>
    );
}
