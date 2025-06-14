package com.decati.sistema.services;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.decati.sistema.domain.Categoria;
import com.decati.sistema.repositories.CategoriaRepository;
import com.decati.sistema.services.excepitions.ObjectNotFoundException;


@Service
public class CategoriaService {
	

	@Autowired
	private CategoriaRepository repo;
	

	public Categoria find(Integer id) {
		Optional<Categoria> obj = repo.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Categoria.class.getName()));
	}
}
