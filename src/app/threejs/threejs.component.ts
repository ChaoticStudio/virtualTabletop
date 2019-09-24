import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/js/loaders/GLTFLoader';
import { DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import { Scene } from 'three';

@Component({
  selector: 'app-threejs',
  templateUrl: './threejs.component.html',
  styleUrls: ['./threejs.component.scss']
})
export class ThreejsComponent implements OnInit {

  // Loader
  private _draco = new DRACOLoader();
  private _loader = new GLTFLoader();

  // Scene
  private _sceneLoaded = false;
  private _width = 300;
  private _height = 200;
  private _scene = new THREE.Scene();
  private _camera = new THREE.PerspectiveCamera(75, this._width/this._height, 1, 100);
  private _renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
  private _light = new THREE.DirectionalLight(0xffffff);

  // Dice
  private _dices = ['../../assets/dices/d20.glb']
  private _d20: THREE.Mesh;

  constructor() {}

  ngOnInit() {
    this._init();
    this._render();
  }

  private _init = () => {
    this._renderer.setSize(this._width, this._height);
    document.querySelector('#scene').appendChild(this._renderer.domElement);

    this._light.position.z = 5;
    this._camera.position.z = 5;

    this._draco.setDecoderPath('../../assets/libs/draco/');
    this._loader.setDRACOLoader(this._draco);
    this._loadObjects(this._dices);

  }

  private _render = () => {
    window.requestAnimationFrame(this._render);
    if(this._sceneLoaded) {
      this._d20.rotation.x += 0.01;
      this._d20.rotation.y += 0.01;
    }
    this._renderer.render(this._scene, this._camera);
  }

  private _loadObjects = (dices: string[]) => {
    let totalProgress = 0;

    const checkProgress = progress => {
      totalProgress += progress;
      totalProgress = Math.min(totalProgress, 100);
      console.log(totalProgress.toFixed(2));
    }
    
    const load = i => {
      this._loader.load(dices[i], gltf => {
        if(i < dices.length-1) {
          load(i++)
        }
        this._d20 = gltf.scene;
        this._d20.scale.set(2,2,2);
        this._scene.add(this._light, this._d20);

        if(totalProgress === 100) {
          this._sceneLoaded = true;
        }

      }, xhr => checkProgress(xhr.loaded / xhr.total * 100 / dices.length))
    }

    load(0);

  }

}
