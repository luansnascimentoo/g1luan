"use client";

import React, { useState } from "react";
import styles from './styles.module.css';

// Classes dos Funcionários
class Funcionario {
    nome: string;
    tempoEmpresa: number;
    salario: number;
    cargo: string;

    constructor(nome: string, tempoEmpresa: number, salario: number, cargo: string) {
        this.nome = nome;
        this.tempoEmpresa = tempoEmpresa;
        this.salario = salario;
        this.cargo = cargo;
    }

    calcularBonus(): number {
        return 0;
    }
}

class FuncionarioComum extends Funcionario {
    calcularBonus(): number {
        return this.salario * 0.1;
    }
}

class Gerente extends Funcionario {
    calcularBonus(): number {
        return this.salario * 0.2;
    }
}

class Diretor extends Funcionario {
    calcularBonus(): number {
        return this.salario * 0.3;
    }
}

const HomePage = () => {
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [nome, setNome] = useState("");
    const [tempoEmpresa, setTempoEmpresa] = useState<string>(""); // Agora é string para aceitar valores do input
    const [salario, setSalario] = useState<string>(""); // Agora é string para aceitar valores do input
    const [cargo, setCargo] = useState("FuncionarioComum");

    const adicionarFuncionario = () => {
        const salarioNum = parseFloat(salario); // Convertemos o salário de string para número
        const tempoEmpresaNum = parseInt(tempoEmpresa); // Convertemos o tempo de string para número

        if (isNaN(salarioNum) || isNaN(tempoEmpresaNum)) {
            alert("Por favor, insira valores válidos para salário e tempo de empresa.");
            return;
        }

        let novoFuncionario: Funcionario;

        switch (cargo) {
            case "Gerente":
                novoFuncionario = new Gerente(nome, tempoEmpresaNum, salarioNum, "Gerente");
                break;
            case "Diretor":
                novoFuncionario = new Diretor(nome, tempoEmpresaNum, salarioNum, "Diretor");
                break;
            default:
                novoFuncionario = new FuncionarioComum(nome, tempoEmpresaNum, salarioNum, "Funcionário Comum");
                break;
        }

        setFuncionarios([...funcionarios, novoFuncionario]);
        limparFormulario();
    };

    const limparFormulario = () => {
        setNome("");
        setTempoEmpresa("");
        setSalario("");
        setCargo("FuncionarioComum");
    };

    const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>, setValue: React.Dispatch<React.SetStateAction<string>>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setValue(value); // Apenas números são aceitos
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Gerenciamento de Pagamento de Funcionários</h1>

            <form
                className={styles.formContainer}
                onSubmit={(e) => {
                    e.preventDefault();
                    adicionarFuncionario();
                }}
            >
                <label htmlFor="nome">Nome:</label>
                <input
                    id="nome"
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className={styles.inputField}
                    required
                />

                <label htmlFor="tempoEmpresa">Tempo de Empresa (anos):</label>
                <input
                    id="tempoEmpresa"
                    type="text"
                    placeholder="Tempo de Empresa (anos)"
                    value={tempoEmpresa}
                    onChange={(e) => handleNumericInput(e, setTempoEmpresa)} // Aceita apenas números
                    className={styles.inputField}
                    required
                />

                <label htmlFor="salario">Salário:</label>
                <input
                    id="salario"
                    type="text"
                    placeholder="Salário"
                    value={salario}
                    onChange={(e) => handleNumericInput(e, setSalario)} // Aceita apenas números
                    className={styles.inputField}
                    required
                />

                <label htmlFor="cargo">Cargo:</label>
                <select 
                    id="cargo"
                    value={cargo} 
                    onChange={(e) => setCargo(e.target.value)} 
                    className={styles.inputField}
                >
                    <option value="FuncionarioComum">Funcionário Comum</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Diretor">Diretor</option>
                </select>

                <button type="submit" className={styles.button}>Adicionar Funcionário</button>
            </form>

            <h2 className={styles.subheading}>Lista de Funcionários</h2>

            <ul className={styles.employeeList}>
                {funcionarios.map((funcionario, index) => (
                    <li key={index} className={styles.employeeItem}>
                        <div className={styles.employeeDetails}>
                            <div className={styles.employeeDetailItem}>
                                <strong>Nome:</strong> {funcionario.nome}
                            </div>
                            <div className={styles.employeeDetailItem}>
                                <strong>Tempo de Empresa:</strong> {funcionario.tempoEmpresa} anos
                            </div>
                            <div className={styles.employeeDetailItem}>
                                <strong>Cargo:</strong> {funcionario.cargo}
                            </div>
                            <div className={styles.employeeDetailItem}>
                                <strong>Salário:</strong> R${funcionario.salario.toFixed(2)}
                            </div>
                            <div className={styles.employeeDetailItem}>
                                <strong>Bônus:</strong> R${funcionario.calcularBonus().toFixed(2)}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
