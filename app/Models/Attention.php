<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Organization;
use Illuminate\Support\Facades\DB;


class Attention extends Model
{
    use HasFactory;
    protected $fillable = [
        'organization_id',
        'dni',
        'name',
        'phone',
        'email',
        'status',
    ];
     public  function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    } 
    public static function listOrganizationValues(): object
    {
        return DB::table('attentions as a')
            ->rightJoin('organizations as o', 'a.organization_id', '=', 'o.id')
            ->select('a.id','a.dni','a.name','a.phone', 'a.email', 'o.name as org', 'a.organization_id')
            ->where('a.status', 1)
           // ->paginate(4);
           ->get();
    }
   
}
