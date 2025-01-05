'use client';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import FormProduct from './FormProduct';

type ModalProps = {
    visible: boolean;
    onHide: () => void;
    productId?: number;
};

export default function Modal({ visible, onHide, productId }: ModalProps) {
    return (
        <Dialog
            header={productId ? 'Editar Produto' : 'Cadastrar Produto'}
            visible={visible}
            onHide={onHide}
            style={{ width: '50vw' }}
        >
            <FormProduct productId={productId} onClose={onHide} />
        </Dialog>
    );
}
