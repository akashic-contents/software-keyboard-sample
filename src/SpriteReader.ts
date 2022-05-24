/** スプライト名と座標情報の紐づけ */
interface SpriteCoordinates { [name: string]: g.CommonArea; }

/** パッキングされた画像からスプライトを生成する */
export class SpriteReader {
	/** 描画対象のシーン */
	private _scene: g.Scene;
	/** 統合された画像内の特定スプライトの座標情報 */
	private _coordinates: SpriteCoordinates;
	/** 統合された画像 */
	private _image: g.ImageAsset;
	/** 統合画像から作成されたサーフェイス */
	// private _surface: g.Surface;

	/**
	 * @param scene 描画対象のシーン
	 * @param hintName 座標情報を含んだJSONファイルのテキストアセット名
	 * @param imageName 統合された画像のアセット名
	 */
	constructor(scene: g.Scene, hintName: string, imageName: string) {
		this._scene = scene;
		this._coordinates = scene.asset.getJSONContentById(hintName);
		this._image = scene.asset.getImageById(imageName);
		// this._surface = g.SurfaceUtil.asSurface(this._image);
	}

	/**
	 * スプライトを生成する
	 * @param name 切り抜く画像名
	 * @param option オプションのパラメータ
	 */
	createSprite(name: string, option?: { x: number, y: number, touchable: boolean }): g.Sprite {
		const coordinate = this._coordinates[name];

		return new g.Sprite({
			scene: this._scene,
			src: this._image,
			width: coordinate.width,
			height: coordinate.height,
			srcWidth: coordinate.width,
			srcHeight: coordinate.height,
			srcX: coordinate.x,
			srcY: coordinate.y,
			x: option.x,
			y: option.y,
			touchable: option.touchable
		});
	}
}
