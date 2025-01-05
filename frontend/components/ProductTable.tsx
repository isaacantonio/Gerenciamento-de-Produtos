'use client';

import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

type Product = {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
};

type ProductTableProps = {
    products: Product[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
};

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
    const handleDelete = (event: React.MouseEvent, productId: number) => {
        confirmPopup({
            target: event.currentTarget as HTMLElement,
            message: 'Deseja apagar o produto?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => onDelete(productId),
            reject: () => { }, // Usado para ação de cancelar
        });
    };

    return (
        <>
            <ConfirmPopup />
            <DataTable value={products} responsiveLayout="scroll">
                <Column field="id" header="ID" />
                <Column field="nome" header="Nome" />
                <Column field="preco" header="Preço R$" />
                <Column field="quantidade" header="Quantidade" />
                <Column
                    body={(rowData) => (
                        <div className="action-buttons">
                            <Button
                                label="Editar"
                                className="p-button-warning p-mr-2"
                                onClick={() => onEdit(rowData.id)}
                            />
                            <Button
                                icon="pi pi-trash"
                                className="p-button-danger"
                                onClick={(event) => handleDelete(event, rowData.id)}
                            />
                        </div>
                    )}
                    header="Ações"
                />
            </DataTable>
        </>
    );
}
