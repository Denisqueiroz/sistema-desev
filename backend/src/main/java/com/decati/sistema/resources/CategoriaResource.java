package com.decati.sistema.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.decati.sistema.domain.Categoria;
import com.decati.sistema.services.CategoriaService;

@RestController
@RequestMapping(value="/categorias")
public class CategoriaResource {

    @Autowired 
    private CategoriaService service;

    @GetMapping
    public ResponseEntity<List<Categoria>> listar() { 
        List<Categoria> lista = service.findAll(); 
        return ResponseEntity.ok().body(lista);
    }

    @GetMapping("/{id}") 
    public ResponseEntity<Categoria> find(@PathVariable Integer id) {
        Categoria obj = service.find(id);
        return ResponseEntity.ok().body(obj);
    }
}