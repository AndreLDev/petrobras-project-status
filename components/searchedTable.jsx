'use client'

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  getKeyValue,
} from "@nextui-org/react";
import { PlusIcon } from "../public/PlusIcon";
import { VerticalDotsIcon } from "../public/VerticalDotsIcon";
import { SearchIcon } from "../public/SearchIcon";
import { ChevronDownIcon } from "../public/ChevronDownIcon";
import { columns, contracts, phaseOptions, typeOptions, columns2 } from "../data";
import { capitalize } from "../utils";


const INITIAL_VISIBLE_COLUMNS = ["name", "title", "status", "lastUpdated", "actions"];

export default function SearchedTable() {
  const [modalContractId, setModalContractId] = React.useState(null);
  const [contractId, setContractId] = React.useState(0);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [phaseFilter, setPhaseFilter] = React.useState("all");
  const [typesFilter, setTypesFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const hasSearchFilter = Boolean(filterValue);

  const onOpenContractModal = React.useCallback((contractId) => {
    setModalContractId(contractId);
    onOpen();
  }, [onOpen]);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredContracts = [...contracts];

    if (hasSearchFilter) {
      filteredContracts = filteredContracts.filter((contract) =>
        contract.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (phaseFilter !== "all" && Array.from(phaseFilter).length !== phaseOptions.length) {
      filteredContracts = filteredContracts.filter((contract) =>
        Array.from(phaseFilter).includes(contract.phase),
      );
    }
    if (typesFilter !== "all" && Array.from(typesFilter).length !== typeOptions.length) {
      filteredContracts = filteredContracts.filter((contract) =>
        Array.from(typesFilter).includes(contract.type),
      );
    }

    return filteredContracts;
  }, [contracts, filterValue, phaseFilter, typesFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((contract, columnKey) => {
    const cellValue = contract[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <h3 className="text-xs sm:text-base" >{cellValue}</h3>
        );
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-xs sm:text-base text-bold capitalize">{cellValue}</p>
          </div>
        );
      case "summary":
      return (
        <div className="flex flex-col">
          <p className="text-xs sm:text-base text-bold capitalize">{cellValue}</p>
        </div>
      );
      case "status":
        return (
          <Chip className="text-xs sm:text-base capitalize" color={contract.statusColor} size="sm" variant="flat">
            {contract.phase}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="text-black">
                <DropdownItem onPress={() => onOpenContractModal(contract.id)}>Visualizar</DropdownItem>
                <DropdownItem>Editar</DropdownItem>
                <DropdownItem>Excluir</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%] text-xs sm:text-base"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            size="xs sm:full"
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="sm:flex">
                <Button className="text-xs sm:text-base" endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Tipo
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={typesFilter}
                selectionMode="multiple"
                onSelectionChange={setTypesFilter}
                className="text-black "
              >
                {typeOptions.map((type) => (
                  <DropdownItem key={type.uid} className="capitalize">
                    {capitalize(type.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={phaseFilter}
                selectionMode="multiple"
                onSelectionChange={setPhaseFilter}
                className="text-black"
              >
                {phaseOptions.map((phase) => (
                  <DropdownItem key={phase.uid} className="capitalize">
                    {capitalize(phase.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
                className="text-black"
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button className="text-xs sm:text-base" color="success" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {contracts.length} contracts</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    phaseFilter,
    typesFilter,
    visibleColumns,
    onRowsPerPageChange,
    contracts.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">

        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="flex sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>



      <Modal style={{ maxHeight: '99vh', overflowY: 'auto' }} size={"3xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className=" text-black flex flex-col sm:flex-row justify-between items-center">{contracts[modalContractId - 1]?.name}</ModalHeader>
              <ModalBody className="text-black" >
                <p className="text-xs sm:text-base">Título: {contracts[modalContractId - 1]?.title}</p>
                <p className="text-xs sm:text-base">Síntese: {contracts[modalContractId - 1]?.summary}</p>
                <Table aria-label="Example table with dynamic content">
                  <TableHeader columns={columns2}>
                    {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
                  </TableHeader>
                  <TableBody items={contracts[modalContractId - 1]?.statusHistory}>
                    {(item) => (
                      <TableRow className="text-xs sm:text-base" key={item.key}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>



  );
}
