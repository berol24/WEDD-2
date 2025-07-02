// Import des dépendances React et Three.js
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useNavigate } from "react-router-dom";

// Fonction pour créer une étiquette de texte en 3D
function createLabel(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 50;
  const ctx = canvas.getContext("2d");
  ctx.font = "bold 32px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(4, 1, 1);
  return sprite;
}

// Composant principal Salle
export default function Salle({
  nbTables = 10, // Nombre total de tables
  nbInvitesParTable = 30, // Nombre d'invités par table
  nomsTables = [], // Noms des tables
  espaceTables = 4, // Espacement entre les tables
  tablePrincipaleNom = "Table Mariés", // Nom de la table principale
  tableAClignoter = null, // Table à faire clignoter
  clignoter = false, // État du clignotement
  onClignotementFini = () => {}, // Callback à la fin du clignotement
  nbColonnesParCote = 2, // Nombre de colonnes de tables de chaque côté
}) {
  const navigate = useNavigate();
  // Références pour le montage du composant et les tables
  const mountRef = useRef();
  const tableRefs = useRef({});

  // Effect principal pour la création et la gestion de la scène 3D
  useEffect(() => {
    // Fonction pour mettre à jour la taille du rendu
    const updateSize = () => {
      const width = Math.min(window.innerWidth, 1200);
      const height = Math.min(window.innerHeight * 0.8, 800);
      return { width, height };
    };

    const { width, height } = updateSize();
    
    // Création de la scène
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd06c38);

    // Configuration de la caméra
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 14, 32);
    camera.lookAt(0, 0, 0);

    // Ajout des lumières
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.4));

      // Création du sol avec plusieurs textures d'images
      const textureLoader = new THREE.TextureLoader();
      const floorTextures = [
        textureLoader.load('/src/assets/img/stephane_illana1.png'),
        textureLoader.load('/src/assets/img/stephane_illana2.png'),
        textureLoader.load('/src/assets/img/stephane_illana3.png'),
        textureLoader.load('/src/assets/img/stephane_illana4.png')
      ];
    
      // Création de plusieurs sections de sol avec différentes textures
      const sectionSize = 25;
      const sections = [
        { x: -12.5, z: -12.5 },
        { x: 12.5, z: -12.5 },
        { x: -12.5, z: 12.5 },
        { x: 12.5, z: 12.5 }
      ];

      sections.forEach((section, index) => {
        const texture = floorTextures[index];
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
      
        const floorGeometry = new THREE.PlaneGeometry(sectionSize, sectionSize);
        const floorMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          side: THREE.DoubleSide
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.set(section.x, 0, section.z);
        scene.add(floor);
      });

    // Création du groupe principal
    const group = new THREE.Group();
    scene.add(group);

    // Création de la table principale
    const mainTable = new THREE.Mesh(
      new THREE.BoxGeometry(4, 1, 2),
      new THREE.MeshPhongMaterial({ color: 0xffffff })
    );
    mainTable.position.set(0, 0.5, -12);
    group.add(mainTable);

    // Création des étiquettes de bienvenue
    const welcomeLabel = createLabel("Stephane & Illana");
    welcomeLabel.position.set(0, 4, -12);
    group.add(welcomeLabel);

      const mainLabel = createLabel(tablePrincipaleNom);
      mainLabel.position.set(0, 2, -12);
      group.add(mainLabel);

      // Ajout de deux chaises derrière la table principale
      const chair1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 2, 0.5),
        new THREE.MeshPhongMaterial({ color: 0x405433 })
      );
      chair1.position.set(-0.75, 0.5, -13);
      group.add(chair1);

      const chair2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 2, 0.5),
        new THREE.MeshPhongMaterial({ color: 0x405433 })
      );
      chair2.position.set(0.75, 0.5, -13);
      group.add(chair2);

    // Création des tables d'invités
    const tablesParCote = Math.floor(nbTables / 2);
    const tablesParColonne = Math.ceil(tablesParCote / nbColonnesParCote);

    tableRefs.current = {};
    for (let i = 0; i < nbTables; i++) {
      const isLeft = i < tablesParCote;
      const colonneIndex = Math.floor((isLeft ? i : i - tablesParCote) / tablesParColonne);
      const rangDansColonne = (isLeft ? i : i - tablesParCote) % tablesParColonne;
      
      const baseX = isLeft ? -8 : 8;
      const x = baseX + (colonneIndex * 4) * (isLeft ? -1 : 1);
      const z = -8 + rangDansColonne * espaceTables;

      // Création de la table
      const table = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1, 1),
        new THREE.MeshPhongMaterial({ color: 0xFFA500 })
      );
      table.position.set(x, 0.5, z);
      group.add(table);

      const nomTable = nomsTables[i] || `Table ${i + 1}`;
      tableRefs.current[nomTable] = table;

      // Création de l'étiquette de la table
      const tableLabel = createLabel(nomTable);
      tableLabel.position.set(x, 2, z);
      group.add(tableLabel);

      // Création des chaises autour de la table
      for (let j = 0; j < nbInvitesParTable; j++) {
        const angle = (j / nbInvitesParTable) * Math.PI * 2;
        const radius = 1.5;
        const cx = x + Math.cos(angle) * radius;
        const cz = z + Math.sin(angle) * radius;
        const chair = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 1, 0.5),
          new THREE.MeshPhongMaterial({ color: 0x405433 })
        );
        chair.position.set(cx, 0.5, cz);
        group.add(chair);
      }
    }

    // Configuration du renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Configuration des contrôles de la caméra
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.09;

    // Variables pour l'animation du clignotement
    let frameId;
    let blinkFrame = 0;
    let blinking = false;
    let blinkTarget = null;
    let blinkOrigColor = null;

    // Fonction d'animation
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Gestion du clignotement
      if (blinking && blinkTarget) {
        blinkFrame++;
        if (blinkFrame < 100000000) {
          if (Math.floor(blinkFrame / 10) % 2 === 0) {
            blinkTarget.material.color.set(0xffffff);
          } else {
            blinkTarget.material.color.set(blinkOrigColor);
          }
        } else {
          blinkTarget.material.color.set(blinkOrigColor);
          blinking = false;
          blinkTarget = null;
          blinkOrigColor = null;
          blinkFrame = 0;
          onClignotementFini();
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Initialisation du clignotement si nécessaire
    if (clignoter && tableAClignoter && tableRefs.current[tableAClignoter]) {
      blinking = true;
      blinkTarget = tableRefs.current[tableAClignoter];
      blinkOrigColor = blinkTarget.material.color.getHex();
      blinkFrame = 0;
    }

    // Gestion du redimensionnement
    const handleResize = () => {
      const { width, height } = updateSize();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Nettoyage
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [nbTables, nbInvitesParTable, nomsTables, espaceTables, tablePrincipaleNom, nbColonnesParCote]);

  // Effect pour gérer le clignotement
  useEffect(() => {
    if (clignoter && tableAClignoter && tableRefs.current[tableAClignoter]) {
    }
  }, [clignoter, tableAClignoter]);

  // Rendu du composant
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90vw',
      height: '80vh',
      maxWidth: '1200px',
      maxHeight: '800px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 0 20px rgba(0,0,0,0.2)',
      overflow: 'hidden'
    }}>
      <button 
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '10px 20px',
          backgroundColor: '#405433',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        Retour
      </button>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
