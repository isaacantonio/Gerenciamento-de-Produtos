'use client';

import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Modal from '../components/Modal';
import ProductTable from '../components/ProductTable';
import api from '../services/api';

const fetchProducts = async () => {
  const { data } = await api.get('/produtos');
  return data;
};



export default function HomePage() {
  const queryClient = useQueryClient();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Função para filtrar os produtos com base no nome ou ID
  interface Product {
    id: number;
    nome: string;
  }
  interface ProductTableProduct extends Product {
    preco: number;
    quantidade: number;
  }
  const filteredProducts: ProductTableProduct[] | undefined = products?.filter((product: ProductTableProduct) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.nome.toLowerCase().includes(searchLower) ||
      product.id.toString().includes(searchLower)
    );
  });

  const openModal = (id?: number) => {
    setSelectedProductId(id ?? undefined);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProductId(undefined);
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  const deleteProduct = async (id: number) => {
    await api.delete(`/produtos/${id}`);
    queryClient.invalidateQueries({ queryKey: ['products'] });

  }

  if (isLoading) return (
    <div className="loading-container">
      <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
    </div>
  );

  return (
    <div>
      <header className="header">
        <h1 className="project-title">Gerenciamento de Produtos</h1>
        <div className="header-icons">
          <Button icon="pi pi-bars" className="p-button-text" />
          <Button icon="pi pi-user" className="p-button-text" />
        </div>
      </header>

      <div className="flex-container">
        <div className='button-container'>
          <Button
            id='createButton'
            label="Novo Produto"
            onClick={() => openModal()}
            className="p-button-success" />

          <Button icon="pi pi-download" className="download" />
        </div>


        <InputText
          value={searchTerm}
          id='productsFilter'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome ou ID"
          style={{ width: '300px', color: 'black' }}
        />


      </div>

      <div style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px', marginBottom: '20px', overflowX: 'auto' }}>
        <ProductTable
          products={filteredProducts || []}
          onEdit={openModal}
          onDelete={(id) => deleteProduct(id)}
        />
      </div>

      <Modal visible={modalVisible} onHide={closeModal} productId={selectedProductId} />
    </div>
  );
}
