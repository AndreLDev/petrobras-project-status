import React from "react";
const columns = [
    { name: "Nome", uid: "name", sortable: true },
    { name: "Título", uid: "title", sortable: true },
    { name: "Síntese", uid: "summary", sortable: true },
    { name: "Última Atualização", uid: "lastUpdated", sortable: true },
    { name: "Status", uid: "status", sortable: true },
    { name: "Ação", uid: "actions" },
  ];

const statusOptions = [
  {name: "Compilar dossiê", uid: "compile"},
  {name: "Revisão Técnica do dossiê", uid: "review"},
  {name: "Orçamento", uid: "Budget"},
  {name: "Envio da demanda para o ECPN", uid: "demand"},
  {name: "Diligenciamento do processo de contratação", uid: "diligence"},
  {name: "Assinatura do Contrato", uid: "Signature"},
  {name: "Divulgação da contratação", uid: "disclosure"},
];

const typeOptions = [
    {name: "ALSO", uid: "also"},
    {name: "ENPI", uid: "enpi"},
    {name: "SMS", uid: "sms"},
    {name: "GIAD", uid: "giad"},
  ];

const contracts = [
    {
      id: 1,
      name: "ALSO-256432",
      title: "Solicitação de óleos para a maquina X",
      summary: "O setor de operações necessita de óleos para realizar a ...",
      lastUpdated: "2024-01-30",
      status: "compile",
      type:"also",
    },
    {
        id: 2,
        name: "ENPI-256432",
        title: "Solicitação de óleos para a maquina X",
        summary: "O setor de operações necessita de óleos para realizar a ...",
        lastUpdated: "2024-01-30",
        status: "compile",
        type:"enpi",
      },
      {
        id: 3,
        name: "SMS-256432",
        title: "Solicitação de óleos para a maquina X",
        summary: "O setor de operações necessita de óleos para realizar a ...",
        lastUpdated: "2024-01-30",
        status: "compile",
        type:"sms",
      },
      {
        id: 4,
        name: "ALSO-256432",
        title: "Solicitação de óleos para a maquina X",
        summary: "O setor de operações necessita de óleos para realizar a ...",
        lastUpdated: "2024-01-30",
        status: "compile",
        type:"also",
      },
      {
        id: 5,
        name: "GIAD-256432",
        title: "Solicitação de óleos para a maquina X",
        summary: "O setor de operações necessita de óleos para realizar a ...",
        lastUpdated: "2024-01-30",
        status: "review",
        type:"giad",
      },
      {
        id: 6,
        name: "ALSO-256432",
        title: "Solicitação de óleos para a maquina X",
        summary: "O setor de operações necessita de óleos para realizar a ...",
        lastUpdated: "2024-01-30",
        status: "review",
        type:"also",
      },
      {
        id: 7,
        name: "ALSO-256432",
        title: "Solicitação de óleos para a maquina X",
        summary: "O setor de operações necessita de óleos para realizar a ...",
        lastUpdated: "2024-01-30",
        status: "compile",
        type:"also",
      },
      {
        id: 8,
        name: "ALSO-256432",
        title: "Solicitação de óleos para a maquina X",
        summary: "O setor de operações necessita de óleos para realizar a ...",
        lastUpdated: "2024-01-30",
        status: "review",
        type:"also",
      },
      {
        id: 9,
        name: "ALSO-256432",
        title: "Solicitação de óleos para a maquina X",
        summary: "O setor de operações necessita de óleos para realizar a ...",
        lastUpdated: "2024-01-30",
        status: "compile",
        type:"also",
      },
    // Adicione mais contratos conforme necessário
  ];

export {columns, contracts, statusOptions, typeOptions};
