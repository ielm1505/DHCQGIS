<form method="GET" class="row mb-3">
    
    <input type="hidden" name="tab" value="tabCargas">

    <div class="col-md-3">

        <select name="empresa"
        class="form-control"
        onchange="this.form.submit()">

            <option value="">Empresa</option>

            <?php foreach($empresas as $e){ ?>

            <option value="<?=$e?>"
            <?=$empresa==$e?'selected':''?>>

            <?=$e?>

            </option>

            <?php } ?>

        </select>

    </div>

    <div class="col-md-3">

        <select name="desarrollo"
        class="form-control">

            <option value="">Desarrollo</option>

            <?php foreach($desarrollos as $d){ ?>

            <option value="<?=$d?>"
            <?=$desarrollo==$d?'selected':''?>>

            <?=$d?>

            </option>

            <?php } ?>

        </select>

    </div>

    <div class="col-md-2">
        <button class="btn btn-primary w-100">
            Filtrar
        </button>
    </div>

</form>

